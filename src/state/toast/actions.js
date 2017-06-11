import nextId from 'tenbyten/utils/nextId'

export function toast (level, message) {
  return {
    type: 'TOAST_SHOW',
    id: nextId(),
    level,
    message,
  }
}
