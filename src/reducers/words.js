import { wordsActionTypes } from 'thedoc/actions/words'

export default function wordsReducer (state = {}, action) {
  switch (action.type) {
    case wordsActionTypes.wordList: {
      return {
        ...state,
        ...action.words,
      }
    }

    case wordsActionTypes.wordEntry: {
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          ...action.entry,
        },
      }
    }

    default:
      return state
  }
}
