import { createSelector } from 'reselect'
import moment from 'moment'

const getRouteParams = state => state.router.params
const getRouteQuery = state => state.router.query

export const getUsername = createSelector(
  [getRouteParams],
  routeParams => routeParams.username
)

export const getListId = createSelector(
  [getRouteParams],
  routeParams => parseInt(routeParams.listId)
)

export const getStartDate = createSelector(
  [getRouteQuery],
  routeQuery => {
    let d = moment(routeQuery.startDate, 'YYYY-MM-DD')
    if (!d.isValid()) {
      d = moment().startOf('year')
    }
    return d
  }
)

export const getEndDate = createSelector(
  [getRouteQuery],
  routeQuery => {
    let d = moment(routeQuery.endDate, 'YYYY-MM-DD')
    if (!d.isValid()) {
      d = moment().endOf('year')
    }
    return d
  }
)
