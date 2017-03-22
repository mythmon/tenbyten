export function updateItem (item) {
  return {
    type: 'UPDATE_ITEM',
    item,
  }
}

export function updateItemMany (items) {
  return {
    type: 'UPDATE_ITEMS',
    items,
  }
}
