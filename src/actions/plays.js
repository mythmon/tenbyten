import moment from 'moment'
import yaml from 'js-yaml'

import { updateItemMany } from 'tenbyten/actions/items'
import { toast } from 'tenbyten/actions/toast'
import { makeBGGRequest } from 'tenbyten/actions/requests'

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
    const requestId = `playList/${username}`
    const response = await dispatch(makeBGGRequest(requestId, '/xmlapi2/plays', {
      username,
      page,
      mindate: startDate.format('YYYY-MM-DD'),
      maxdate: endDate.format('YYYY-MM-DD'),
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
    const playsObjs = []
    const itemsObjs = []

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

      itemsObjs.push(itemObj)
      playsObjs.push(playObj)
    }

    dispatch(updateItemMany(itemsObjs))
    dispatch(addPlayMany(playsObjs))
  }
}
