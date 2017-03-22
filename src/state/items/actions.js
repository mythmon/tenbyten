export const UPDATE_ITEM = 'UPDATE_ITEM'
export const UPDATE_ITEM_MANY = 'UPDATE_ITEM_MANY'

export function updateItem (item) {
  return {
    type: UPDATE_ITEM,
    item,
  }
}

export function updateItemMany (items) {
  return {
    type: UPDATE_ITEM_MANY,
    items,
  }
}
