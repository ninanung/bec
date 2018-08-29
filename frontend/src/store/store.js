import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducer';
import state from './state';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
let store = createStore(persistedReducer, state)
let persistor = persistStore(store)

export {store, persistor};