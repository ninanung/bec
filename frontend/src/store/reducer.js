import { combineReducers } from 'redux'

import signup_basic from './reducers/store_signup_basic';
import signup_imap from './reducers/store_signup_imap';

const reducer = combineReducers({signup_basic, signup_imap});

export default reducer;