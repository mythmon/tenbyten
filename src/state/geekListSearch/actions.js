import { makeBGGRequest } from 'tenbyten/state/requests/actions'

export function setSearchUsername (username) {
  return {
    type: 'GEEKLIST_SEARCH_SET_USERNAME',
    username,
  }
}

export function setGeekListSearchResult (username, result) {
  return {
    type: 'GEEKLIST_SEARCH_SET_RESULT',
    username,
    result,
  }
}

export function searchForGeekLists (username) {
  return async dispatch => {
    dispatch(setGeekListSearchResult(username, {status: 'pending', list: []}))

    const requestId = `geekListSearch/${username}`
    const response = await dispatch(makeBGGRequest(requestId, `/geeklist/lists/user/${username}`))
    const docString = await response.text()

    const parser = new DOMParser()
    const doc = parser.parseFromString(docString, 'text/html')

    const errorBox = doc.querySelector('.messagebox.error')
    if (errorBox) {
      dispatch(setGeekListSearchResult(username, {
        status: 'error',
        list: [],
        detail: errorBox.textContent.trim(),
      }))
      return
    }

    const resultTrs = Array.prototype.slice.call(doc.querySelectorAll('.forum_table tbody tr'), 1)
    const results = []
    const hrefRegex = /^\/geeklist\/(\d+)\/(.*)$/
    for (let tr of resultTrs) {
      const link = tr.querySelector('.mf a')
      results.push({
        title: link.textContent.trim(),
        id: parseInt(link.getAttribute('href').match(hrefRegex)[1]),
      })
    }
    dispatch(setGeekListSearchResult(username, {status: 'success', list: results}))
  }
}
