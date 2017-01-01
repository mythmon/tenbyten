export const getGeekList219091 = state => (
  state.geekLists[219091]
  ? {
    ...state.geekLists[219091],
    items: state.geekLists[219091].items.map(itemId => state.items[itemId]),
  }
  : null
)
