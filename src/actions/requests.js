import { actionMap } from '../utils'

export const requestActionTypes = actionMap('requests', [
  'requestStart',
  'requestSuccess',
  'requestFail',
])

export function requestStart (requestId) {
  return {
    type: requestActionTypes.requestStart,
    requestId,
  }
}

export function requestSuccess (requestId) {
  return {
    type: requestActionTypes.requestSuccess,
    requestId,
  }
}

export function requestFail (requestId, error) {
  return {
    type: requestActionTypes.requestFail,
    requestId,
    error,
  }
}

export default {
  requestActionTypes,
  requestStart,
  requestSuccess,
  requestFail,
}
