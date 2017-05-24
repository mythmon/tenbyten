// @flow
import type { Player } from 'tenbyten/state/players/types'
import type { Item, NormalizedItem } from 'tenbyten/state/items/types'
import type { CollectionState } from 'tenbyten/state/collection'

export type NormalizedPlay = {
  id: number,
  date: moment$Moment,
  comments: String,
  commentsParsed: ?{[string]: any},
  players: Array<number>,
  item: NormalizedItem,
}

export type Play = {
  id: number,
  date: moment$Moment,
  comments: String,
  commentsParsed: ?{[string]: any},
  players: Array<Player>,
  item: Item,
}

export type PlaysState = CollectionState<NormalizedPlay>
