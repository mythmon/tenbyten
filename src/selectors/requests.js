import { createSelector } from 'reselect'

export const getRequests = state => state.requests

export const getAnyRequestLoading = createSelector(
  [getRequests],
  requests => Object.values(requests)
              .filter(req => req.inProgress)
              .length > 0
)
