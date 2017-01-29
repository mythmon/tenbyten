import { createSelector } from 'reselect'

import { getCurrentPlays } from 'tenbyten/selectors/plays'

export const getSessionsByItem = createSelector(
  [getCurrentPlays],
  currentPlays => {

  }
)
