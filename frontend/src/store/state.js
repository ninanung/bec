const state = {
    signup_basic: {
        id: '',
        password: '',
        address: '',
        name: '',
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
    channels: [],
    mails: [],
    sent: [],
    is_signin: false,
    is_wrong: false,
    fcm_cloud_messaging_token: '',
}

export default state;