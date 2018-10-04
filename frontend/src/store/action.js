export const store_signup_imap = (signup_imap) => {
    return {
        type: 'IMAP_INFO',
        signup_imap,
    }
}

export const store_signup_basic = (signup_basic) => {
    return {
        type: 'BASIC_INFO',
        signup_basic,
    }
}

export const clear_signup_imap = () => {
    return {
        type: 'CLEAR_IMAP',
    }
}

export const clear_signup_basic = () => {
    return {
        type: 'CLEAR_BASIC',
    }
}

export const store_signup_smtp = (signup_smtp) => {
    return {
        type: 'SMTP_INFO',
        signup_smtp,
    }
}

export const clear_signup_smtp = () => {
    return {
        type: 'CLEAR_SMTP',
    }
}

export const make_signin = () => {
    return {
        type: 'MAKE_SIGNIN',
    }
}

export const make_signout = () => {
    return {
        type: 'MAKE_SIGNOUT',
    }
}

export const make_wrong= () => {
    return {
        type: 'MAKE_WRONG',
    }
}

export const make_fine = () => {
    return {
        type: 'MAKE_FINE',
    }
}

export const insert_channels = (channels) => {
    return {
        type: 'INSERT_CHANNELS',
        channels,
    }
}

export const empty_channels = () => {
    return {
        type: 'EMPTY_CHANNELS',
    }
}

export const insert_mails = (mails) => {
    return {
        type: 'INSERT_MAILS',
        mails,
    }
}

export const empty_mails = () => {
    return {
        type: 'EMPTY_MAILS',
    }
}

export const insert_sent = (sent) => {
    return {
        type: 'INSERT_SENT',
        sent,
    }
}

export const empty_sent = () => {
    return {
        type: 'EMPTY_SENT',
    }
}