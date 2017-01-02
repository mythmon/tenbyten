import {
  REQUEST_START,
  REQUEST_FAIL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
} from 'tenbyten/actions/requests'

export default function requestsReducer (state = {}, action) {
  switch (action.type) {
    case REQUEST_START: {
      return {
        ...state,
        [action.requestId]: {
          inProgress: true,
          error: null,
        },
      }
    }

    case REQUEST_SUCCESS: {
      return {
        ...state,
        [action.requestId]: {
          inProgress: false,
          error: null,
        },
      }
    }

    case REQUEST_FAIL: {
      return {
        ...state,
        [action.requestId]: {
          inProgress: false,
          error: action.error,
        },
      }
    }

    case REQUEST_PENDING: {
      return {
        ...state,
        [action.requestId]: {
          inProgress: true,
          error: null,
        },
      }
    }

    default:
      return state
  }
}
