const state = {
    signup_basic: {
        id: '',
        password: '',
    },
    signup_smtp: {
        smtp_id: '',
        smtp_password: '',
        smtp_host: '',
        smtp_port: '',
        smtp_secure: true,
    },
    signup_imap: {
        imap_id: '',
        imap_password: '',
        imap_host: '',
        imap_port: '',
        imap_tls: true,
    },
    is_signin: false,
}

export default state;