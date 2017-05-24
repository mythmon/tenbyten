// @flow
import type { GeekListState } from 'tenbyten/state/geekLists/types'
import type { PlaysState } from 'tenbyten/state/plays/types'

type RouterState = any

export type State = {
  router: RouterState,
  geekLists: GeekListState,
  plays: PlaysState
}

export type Action = void
