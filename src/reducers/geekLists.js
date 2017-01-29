import { ADD_GEEK_LIST } from 'tenbyten/actions/geekLists'
import makeCollectionReducer from 'tenbyten/reducers/collection'

export default makeCollectionReducer({ addOne: ADD_GEEK_LIST })
