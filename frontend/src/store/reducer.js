import { combineReducers } from 'redux'

import signup_basic from './reducers/signup_basic';
import signup_imap from './reducers/signup_imap';

export default combineReducers({signup_basic, signup_imap});