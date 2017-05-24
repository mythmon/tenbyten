// @flow
import type { Play } from 'tenbyten/state/plays/types'

export type Session = {
  plays: Array<Play>,
  date: moment$Moment,
}
