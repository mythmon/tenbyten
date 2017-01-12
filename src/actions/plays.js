import moment from 'moment'
import yaml from 'js-yaml'

import { updateItemMany } from 'tenbyten/actions/items'
import { updatePlayerMany } from 'tenbyten/actions/players'
import { toast } from 'tenbyten/actions/toast'
import { makeBGGRequest } from 'tenbyten/actions/requests'
import nextId from 'tenbyten/utils/nextId'

export const ADD_PLAY = 'ADD_PLAY'
export const ADD_PLAY_MANY = 'ADD_PLAY_MANY'

export function addPlay (play) {
  return {
    type: ADD_PLAY,
    play,
  }
}

export function addPlayMany (plays) {
  return {
    type: ADD_PLAY_MANY,
    plays,
  }
}

export function requestPlayList (username, startDate, endDate, page = 1) {
  return async dispatch => {
    let mindate = startDate.format('YYYY-MM-DD')
    let maxdate = endDate.format('YYYY-MM-DD')
    const requestId = `playList/${username}/${mindate}/${maxdate}`
    const response = await dispatch(makeBGGRequest(requestId, '/xmlapi2/plays', {
      username,
      page,
      mindate,
      maxdate,
    }))
    const docString = await response.text()

    const parser = new DOMParser()
    const doc = parser.parseFromString(docString, 'application/xml')
    const plays = doc.querySelector('plays')

    if (!plays) {
      dispatch(toast('error', `Could not load plays for player ${username}`))
      return
    }

    const playsPerPage = 100
    if (plays.getAttribute('total') > page * playsPerPage) {
      dispatch(requestPlayList(username, page + 1))
    }

    const creator = plays.getAttribute('username')
    const playObjs = []
    const itemObjs = new Set()
    const playerObjs = new Set()

    for (let play of plays.querySelectorAll('play')) {
      const item = play.querySelector('item')
      const itemObj = {
        id: parseInt(item.getAttribute('objectid')),
        name: item.getAttribute('name'),
      }
      const comments = play.querySelector('comments') || null
      const playObj = {
        creator,
        id: parseInt(play.getAttribute('id')),
        date: moment(play.getAttribute('date'), 'YYYY-MM-DD', true),
        item: itemObj.id,
        comments: comments ? comments.textContent : null,
        commentsParsed: null,
        length: parseInt(play.getAttribute('length')),
        players: [],
      }

      if (playObj.comments && playObj.comments !== '') {
        try {
          let parsed = yaml.safeLoad(playObj.comments)
          if (typeof parsed === 'object') {
            playObj.commentsParsed = parsed
          }
        } catch (e) {
          // pass
        }
      }
      if (isNaN(playObj.length)) {
        playObj.length = null
      }

      const players = Array.from(play.querySelector('players').querySelectorAll('player'))
      for (const player of players) {
        // shared player obj
        let playerObj = {
          id: player.getAttribute('userid'),
          username: player.getAttribute('username'),
          name: player.getAttribute('name'),
        }
        if (playerObj.id === '0') {
          if (playerObj.username) {
            playerObj.id = `ext-username-${playerObj.username}`
          } else if (playerObj.name) {
            playerObj.id = `ext-name-${playerObj.name}`
          } else {
            playerObj.id = `ext-anon-${nextId()}`
          }
        }

        playerObjs.add(playerObj)
        // local version of the player
        playObj.players.push({
          id: playerObj.id,
          startPosition: player.getAttribute('startPosition'),
          color: player.getAttribute('color'),
          score: parseFloat(player.getAttribute('score')),
          newPlayer: player.getAttribute('new') === '1',
          win: player.getAttribute('win') === '1',
        })
      }

      itemObjs.add(itemObj)
      playObjs.push(playObj)
    }

    dispatch(updateItemMany(Array.from(itemObjs)))
    dispatch(updatePlayerMany(Array.from(playerObjs)))
    dispatch(addPlayMany(Array.from(playObjs)))
  }
}
