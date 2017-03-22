import nextId from 'tenbyten/utils/nextId'

export const TOAST_SHOW = 'TOAST_SHOW'

export function toast (level, message) {
  return {
    type: TOAST_SHOW,
    id: nextId(),
    level,
    message,
  }
}
