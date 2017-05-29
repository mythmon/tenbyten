// @flow
import type { GeekListState } from 'tenbyten/state/geekLists/types'
import type { PlaysState } from 'tenbyten/state/plays/types'
import type { PlayersState } from 'tenbyten/state/players/types'
import type { ItemsState } from 'tenbyten/state/items/types'

type RouterState = any

export type State = {
  router: RouterState,
  geekLists: GeekListState,
  plays: PlaysState,
  players: PlayersState,
  items: ItemsState,
}

export type Action = {
  type: string,
}
