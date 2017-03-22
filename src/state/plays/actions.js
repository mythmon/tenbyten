import moment from 'moment'
import yaml from 'js-yaml'

import { updateItemMany } from 'tenbyten/state/items/actions'
import { updatePlayerMany } from 'tenbyten/state/players/actions'
import { toast } from 'tenbyten/state/toast/actions'
import { makeBGGRequest } from 'tenbyten/state/requests/actions'
import nextId from 'tenbyten/utils/nextId'

export function addPlay (play) {
  return {
    type: 'ADD_PLAY',
    item: play,
  }
}

export function addPlayMany (plays) {
  return {
    type: 'ADD_PLAYS',
    items: plays,
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

      let players = []
      let playersEl = play.querySelector('players')
      if (playersEl) {
        players = Array.from(playersEl.querySelectorAll('player'))
      }
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

        const localPlayer = {
          id: playerObj.id,
          startPosition: player.getAttribute('startPosition'),
          color: player.getAttribute('color'),
          score: parseFloat(player.getAttribute('score')),
          newPlayer: player.getAttribute('new') === '1',
          win: player.getAttribute('win') === '1',
        }
        if (isNaN(localPlayer.score)) {
          localPlayer.score = null
        }
        playObj.players.push(localPlayer)
      }

      itemObjs.add(itemObj)
      playObjs.push(playObj)
    }

    dispatch(updateItemMany(Array.from(itemObjs)))
    dispatch(updatePlayerMany(Array.from(playerObjs)))
    dispatch(addPlayMany(Array.from(playObjs)))
  }
}
