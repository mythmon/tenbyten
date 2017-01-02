export const TOAST_SHOW = 'TOAST_SHOW'

const nextId = () => {
  let _id = 1
  return () => {
    return _id++
  }
}

export function toast (level, message) {
  return {
    type: TOAST_SHOW,
    id: nextId(),
    level,
    message,
  }
}
