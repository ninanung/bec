import state from '../state';

const initialState = state.signup_imap

export const signup_imap = (state = initialState, action) => {
    switch (action.type) {
        case 'IMAP_INFO':
            return Object.assign({}, state, {
                signup_imap: actions.signup_imap
            })
        default:
            return state;
    }
}