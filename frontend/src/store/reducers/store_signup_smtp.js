import state from '../state';

const initialState = state.signup_smtp

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SMTP_INFO':
            return Object.assign({}, state, {
                smtp_id: action.signup_smtp.smtp_id,
                smtp_password: action.signup_smtp.smtp_password,
                smtp_host: action.signup_smtp.smtp_host,
                smtp_port: action.signup_smtp.smtp_port,
                smtp_secure: action.signup_smtp.smtp_tls,
            })
        case 'CLEAR_SMTP':
            return Object.assign({}, state, {
                smtp_id: '',
                smtp_password: '',
                smtp_host: '',
                smtp_port: '',
                smtp_secure: null,
            })
        default:
            return state;
    }
}