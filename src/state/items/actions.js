export function updateItem (item) {
  return {
    type: 'ITEM_UPDATE',
    item,
  }
}

export function updateItemMany (items) {
  return {
    type: 'ITEM_UPDATE_MANY',
    items,
  }
}
