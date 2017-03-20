import { createSelector } from 'reselect'

export const getUsername = state => state.geekListSearch.username

export const getAllSearchResults = state => state.geekListSearch.searchResults

export const getCurrentSearchResults = createSelector(
  [getUsername, getAllSearchResults],
  (username, allSearchResults) => {
    if (!username) {
      return null
    }
    if (!(username in allSearchResults)) {
      return null
    }
    return allSearchResults[username]
  }
)
