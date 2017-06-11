export default function createReducer (initialState, handlers) {
  return (state = initialState, action) => {
    if (action.type in handlers) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
