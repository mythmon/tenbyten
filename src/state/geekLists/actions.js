import { makeBGGRequest } from 'tenbyten/state/requests/actions'
import { updateItemMany } from 'tenbyten/state/items/actions'

export function addGeekList (geekList) {
  return {
    type: 'GEEK_LIST_ADD',
    item: geekList,
  }
}

export function requestGeekList (listId) {
  return async dispatch => {
    const requestId = `geekList/${listId}`
    const response = await dispatch(makeBGGRequest(requestId, `/xmlapi/geeklist/${listId}`))
    const docString = await response.text()

    const parser = new DOMParser()
    const doc = parser.parseFromString(docString, 'application/xml')
    const geekList = doc.querySelector('geeklist')
    const itemObjs = []

    let geekListObj = {
      id: parseInt(geekList.getAttribute('id')),
      itemIds: Array.from(geekList.querySelectorAll('item')).map(item => {
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
