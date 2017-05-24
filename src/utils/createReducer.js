export default function createReducer (initialState, handlers) {
  return (state: S = initialState, action: Action) => {
    if (action.type in handlers) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
