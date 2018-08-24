import state from '../state';

const initialState = state.signup_imap

export default (state = initialState, action) => {
    switch (action.type) {
        case 'IMAP_INFO':
            return Object.assign({}, state, {
                signup_imap: action.signup_imap
            })
        default:
            return state;
    }
}