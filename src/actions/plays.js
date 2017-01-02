import moment from 'moment'
import yaml from 'js-yaml'

import { requestStart, requestSuccess, requestFail } from 'tenbyten/actions/requests'
import { updateItemMany } from 'tenbyten/actions/items'
import { toast } from 'tenbyten/actions/toast'

export const ADD_PLAY = 'ADD_PLAY'
export const ADD_PLAY_MANY = 'ADD_PLAY_MANY'

// const API_URL = 'https://crossorigin.me/https://www.boardgamegeek.com/xmlapi2'
const API_URL = 'http://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2'

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

export function requestPlayList (username) {
  return async dispatch => {
    const requestId = `playList/${username}`
    dispatch(requestStart(requestId))

    let docString

    try {
      const response = await fetch(`${API_URL}/plays?username=${username}&mindate=2017-01-01&max-date=2017-12-31`)
      if (response.state >= 400) {
        let e = new Error(await response.text())
        e.response = response
        dispatch(requestFail(requestId, e))
        return
      } else {
        dispatch(requestSuccess(requestId))
        docString = await response.text()
      }
    } catch (e) {
      dispatch(requestFail(requestId, e))
      return
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(docString, 'application/xml')
    const plays = doc.querySelector('plays')

    if (!plays) {
      dispatch(toast('error', `Could not load plays for player ${username}`))
      return
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
          playObj.commentsParsed = yaml.safeLoad(playObj.comments)
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
