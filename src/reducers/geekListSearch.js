import {
  GEEKLIST_SEARCH_SET_USERNAME,
  GEEKLIST_SEARCH_SET_RESULT,
} from 'tenbyten/actions/geekListSearch'

const initialState = {
  username: '',
  searchResults: {},
}

export default function geekListSearchReducer (state = initialState, action) {
  switch (action.type) {
    case GEEKLIST_SEARCH_SET_USERNAME: {
      return {
        ...state,
        username: action.username,
      }
    }

    case GEEKLIST_SEARCH_SET_RESULT: {
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          [action.username]: action.result,
        },
      }
    }

    default: {
      return state
    }
  }
}
