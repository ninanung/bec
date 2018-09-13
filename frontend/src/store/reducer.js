import { combineReducers } from 'redux'

import signup_basic from './reducers/store_signup_basic';
import signup_imap from './reducers/store_signup_imap';
import signup_smtp from './reducers/store_signup_smtp';
import sign_in_out from './reducers/sign_in_out';

const reducer = combineReducers({signup_basic, signup_imap, signup_smtp, sign_in_out});

export default reducer;