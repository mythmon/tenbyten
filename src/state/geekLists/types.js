// @flow
import type { Item } from 'tenbyten/state/items/types'
import type { CollectionState } from 'tenbyten/state/collection'

export type NormalizedGeekList = {
  id: number,
  items: Array<number>,
}

export type GeekList = {
  id: number,
  items: Array<Item>,
}

export type GeekListState = CollectionState<NormalizedGeekList>
