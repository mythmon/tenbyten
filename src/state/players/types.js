import type { CollectionState } from 'tenbyten/state/collection'

export type Player = {
  id: string,
  name: ?string,
  username: ?string,
}

export type PlayersState = CollectionState<Player>
