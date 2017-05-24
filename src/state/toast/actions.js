// @flow
import nextId from 'tenbyten/utils/nextId'

import type { ToastShowAction, ToastLevel } from 'tenbyten/state/toast/types'

export function toast (level: ToastLevel, message: string): ToastShowAction {
  return {
    type: 'TOAST_SHOW',
    id: nextId(),
    level,
    message,
  }
}
