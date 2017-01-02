import { requestStart, requestSuccess, requestFail } from 'tenbyten/actions/requests'
import { updateItemMany } from 'tenbyten/actions/items'

export const ADD_GEEK_LIST = 'ADD_GEEK_LIST'

const API_URL = 'http://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi'

export function addGeekList (geekList) {
  return {
    type: ADD_GEEK_LIST,
    geekList,
  }
}

export function requestGeekList (listId) {
  return async dispatch => {
    const requestId = `geekList/${listId}`
    dispatch(requestStart(requestId))

    let docString

    try {
      const response = await fetch(`${API_URL}/geeklist/${listId}`)
      if (response.state >= 400) {
        let e = new Error(await response.text())
        e.response = response
        dispatch(requestFail(requestId, e))
        return
      } else if (response.state === 202) {
        // request accepted, retry for actual content
        dispatch(requestSuccess(requestId))
        setTimeout(() => dispatch(requestGeekList(listId)), 5000)
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
    const geekList = doc.querySelector('geeklist')
    const itemObjs = []

    let geekListObj = {
      id: parseInt(geekList.getAttribute('id')),
      items: Array.from(geekList.querySelectorAll('item')).map(item => {
        const itemObj = {
          id: parseInt(item.getAttribute('objectid')),
          name: item.getAttribute('objectname'),
        }
        itemObjs.push(itemObj)
        return itemObj.id
      }),
    }

    dispatch(updateItemMany(itemObjs))
    dispatch(addGeekList(geekListObj))
  }
}
