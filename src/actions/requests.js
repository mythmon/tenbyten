export const REQUEST_START = 'REQUEST_START'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAIL = 'REQUEST_FAIL'
export const REQUEST_PENDING = 'REQUEST_PENDING'

const BGG_BASE_URL = 'http://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com'
export function makeBGGRequest (requestId, endpoint, query = {}) {
  return async dispatch => {
    let url = new URL(BGG_BASE_URL + endpoint)
    for (let key in query) {
      url.searchParams.set(key, query[key])
    }

    try {
      const response = await fetch(url)
      if (response.state >= 400) {
        let e = new Error(await response.text())
        e.response = response
        dispatch(requestFail(requestId, e))
        throw e
      } else if (response.state === 202) {
        // request accepted, retry for actual content
        dispatch(requestPending(requestId))
        return new Promise(resolve => {
          setTimeout(() => resolve(dispatch(makeBGGRequest)), 5000)
        })
      } else {
        dispatch(requestSuccess(requestId))
        return response
      }
    } catch (e) {
      dispatch(requestFail(requestId, e))
      throw e
    }
  }
}

export function requestStart (requestId) {
  return {
    type: REQUEST_START,
    requestId,
  }
}

export function requestSuccess (requestId) {
  return {
    type: REQUEST_SUCCESS,
    requestId,
  }
}

export function requestFail (requestId, error) {
  return {
    type: REQUEST_FAIL,
    requestId,
    error,
  }
}

export function requestPending (requestId) {
  return {
    type: REQUEST_PENDING,
    requestId,
  }
}
