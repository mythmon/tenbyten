export const UPDATE_ITEM = 'UPDATE_ITEM'

export function updateItem (item) {
  return {
    type: UPDATE_ITEM,
    item,
  }
}
