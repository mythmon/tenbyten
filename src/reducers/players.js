import { UPDATE_PLAYER, UPDATE_PLAYER_MANY } from 'tenbyten/actions/players'
import makeCollectionReducer from 'tenbyten/reducers/collection'

export default makeCollectionReducer({ updateOne: UPDATE_PLAYER, updateMany: UPDATE_PLAYER_MANY })
