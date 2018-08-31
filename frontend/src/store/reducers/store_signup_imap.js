import state from '../state';

const initialState = state.signup_imap

export default (state = initialState, action) => {
    switch (action.type) {
        case 'IMAP_INFO':
            return Object.assign({}, state, {
                imap_id: action.signup_imap.imap_id,
                imap_password: action.signup_imap.imap_password,
                imap_host: action.signup_imap.imap_host,
                imap_port: action.signup_imap.imap_port,
                imap_tls: action.signup_imap.imap_tls,
            })
        case 'CLEAR_IMAP':
            return Object.assign({}, state, {
                imap_id: '',
                imap_password: '',
                imap_host: '',
                imap_port: '',
                imap_tls: null,
            })
        default:
            return state;
    }
}