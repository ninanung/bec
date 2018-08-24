export const signup_imap = (signup_imap) => {
    return {
        type: 'IMAP_INFO',
        signup_imap
    }
}

export const signup_basic = (signup_basic) => {
    return {
        type: 'BASIC_INFO',
        signup_basic
    }
}