import state from '../state';

const initialState = state.signup_basic

export default (state = initialState, action) => {
    switch (action.type) {
        case 'BASIC_INFO':
            return Object.assign({}, state, {
                id: action.signup_basic.id,
                password: action.signup_basic.password,
            })
        case 'CLEAR_BASIC':
            return Object.assign({}, state, {
                id: '',
                password: '',
            })
        default:
            return state;
    }
}