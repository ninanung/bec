import { combineReducers } from 'redux'

import signup_basic from './reducers/store_signup_basic';
import signup_imap from './reducers/store_signup_imap';
import signup_smtp from './reducers/store_signup_smtp';
import is_signin from './reducers/is_signin';
import channels from './reducers/channels';

const reducer = combineReducers({signup_basic, signup_imap, signup_smtp, is_signin, channels});

export default reducer;