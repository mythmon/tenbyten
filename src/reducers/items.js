import { UPDATE_ITEM, UPDATE_ITEM_MANY } from 'tenbyten/actions/items'
import makeCollectionReducer from 'tenbyten/reducers/collection'

export default makeCollectionReducer({ updateOne: UPDATE_ITEM, updateMany: UPDATE_ITEM_MANY })
