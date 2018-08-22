import state from '../state';

const initialState = state.signup_basic

export const signup_basic = (state = initialState, action) => {
    switch (action.type) {
        case 'BASIC_INFO':
            return Object.assign({}, state, {
                signup_basic: actions.signup_basic
            })
        default:
            return state;
    }
}