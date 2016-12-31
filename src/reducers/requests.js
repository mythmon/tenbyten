import { requestActionTypes } from 'tenbyten/actions/requests'

export default function requestsReducer (state = {}, action) {
  switch (action.type) {
    case requestActionTypes.requestStart: {
      return {
        ...state,
        [action.requestId]: {
          inProgress: true,
          error: null,
        },
      }
    }

    case requestActionTypes.requestSuccess: {
      return {
        ...state,
        [action.requestId]: {
          inProgress: false,
          error: null,
        },
      }
    }

    case requestActionTypes.requestFail: {
      return {
        ...state,
        [action.requestId]: {
          inProgress: false,
          error: action.error,
        },
      }
    }

    default:
      return state
  }
}
