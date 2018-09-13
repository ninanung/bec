import state from '../state';

const initialState = state.is_signin;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_SIGNIN':
            return Object.assign({}, state, {
                is_signin: true,
            })
        case 'MAKE_SIGNOUT':
            return Object.assign({}, state, {
                is_signin: false,
            })
        default:
            return state;
    }
}