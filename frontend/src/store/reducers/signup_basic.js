import state from '../state';

const initialState = state.signup_basic

export default (state = initialState, action) => {
    switch (action.type) {
        case 'BASIC_INFO':
            return Object.assign({}, state, {
                signup_basic: action.signup_basic
            })
        default:
            return state;
    }
}