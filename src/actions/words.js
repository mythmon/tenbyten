import { actionMap } from '../utils'

export const wordsActionTypes = actionMap('words', [
  'wordList',
  'wordEntry',
])
import { requestStart, requestSuccess, requestFail } from 'thedoc/actions/requests'

const API_URL = '/api'

export function requestWordList () {
  return async dispatch => {
    const requestId = 'wordList'
    dispatch(requestStart(requestId))

    try {
      const response = await fetch(`${API_URL}/words.json`)
      if (response.status >= 400) {
        let e = new Error(await response.json())
        e.response = response
        dispatch(requestFail(requestId, e))
      } else {
        dispatch(requestSuccess(requestId))
        dispatch({
          type: wordsActionTypes.wordList,
          words: await response.json(),
        })
      }
    } catch (e) {
      dispatch(requestFail(requestId, e))
    }
  }
}

export function requestWordEntry (slug) {
  if (slug === undefined) {
    throw new Error('word slug is undefined')
  }

  return async dispatch => {
    const requestId = `word/${slug}`
    dispatch(requestStart(requestId))

    try {
      const response = await fetch(`${API_URL}/words/${slug}.json`)
      if (response.status >= 400) {
        let e = new Error(await response.json())
        e.response = response
        dispatch(requestFail(requestId, e))
      } else {
        dispatch(requestSuccess(requestId))
        dispatch({
          type: wordsActionTypes.wordEntry,
          slug,
          entry: await response.json(),
        })
      }
    } catch (e) {
      dispatch(requestFail(requestId, e))
    }
  }
}

export default {
  wordsActionTypes,
  requestWordList,
  requestWordEntry,
}
