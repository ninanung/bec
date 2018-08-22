import { createStore, combineReducers } from 'redux';

import state from './state';

import signup_basic from './reducers/signup_basic';
import signup_imap from './reducers/signup_imap';

const store = createStore(
    combineReducers({signup_basic, signup_imap}),
    state
)

export default store;