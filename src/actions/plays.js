import { requestStart, requestSuccess, requestFail } from 'tenbyten/actions/requests'
import { updateItemMany } from 'tenbyten/actions/items'

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
      const response = await fetch(`${API_URL}/plays?username=${username}`)
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
    const plays = []
    const items = []

    for (let play of doc.querySelectorAll('play')) {
      const item = play.querySelector('item')
      const itemObj = {
        id: parseInt(item.getAttribute('objectid')),
        name: item.getAttribute('name'),
      }
      const playObj = {
        id: parseInt(play.getAttribute('id')),
        date: new Date(play.getAttribute('date')),
        item: itemObj.id,
      }
      items.push(itemObj)
      plays.push(playObj)
    }

    dispatch(updateItemMany(items))
    dispatch(addPlayMany(plays))
  }
}
