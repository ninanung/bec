import { createStore } from 'redux';

import reducer from './reducer';
import state from './state';

let store = createStore(reducer, state);

export default store;