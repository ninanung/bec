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