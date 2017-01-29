import { ADD_PLAY, ADD_PLAY_MANY } from 'tenbyten/actions/plays'
import makeCollectionReducer from 'tenbyten/reducers/collection'

export default makeCollectionReducer({ addOne: ADD_PLAY, addMany: ADD_PLAY_MANY })
