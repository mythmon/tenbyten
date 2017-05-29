// @flow
import type { CollectionState } from 'tenbyten/state/collection'

export type NormalizedItem = {
  id: number,
}

export type Item = {
  id: number,
}

export type ItemsState = CollectionState<NormalizedItem>
