import state from '../state';

const initialState = state.is_signin;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_SIGNIN':
            return true;
        case 'MAKE_SIGNOUT':
            return false;
        default:
            return state;
    }
}