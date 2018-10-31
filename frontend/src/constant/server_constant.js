const BASE_URL = 'http://localhost:3001';

//user
const SIGNIN = '/api/post/signin';
const SIGNUP = '/api/post/signup';
const UPDATE_USER = '/api/post/update/user';

//imap
const CONNECT_IMAP = '/api/post/imap'
const DISCONNECT = '/api/post/imap/disconnect';
const MARK_SEEN = '/api/post/imap/mark/seen';

//smtp
const SEND_MAIL = '/api/post/smtp/send';
const GET_EMAIL_SENT = '/api/post/smtp/emails/sent';

//channel
const INSERT_CHANNELS = '/api/post/channels/insert';
const DELETE_CHANNELS = '/api/post/channels/delete';

export default {
    BASE_URL: BASE_URL,
    SIGNIN: BASE_URL + SIGNIN,
    SIGNUP: BASE_URL + SIGNUP,
    CONNECT_IMAP: BASE_URL + CONNECT_IMAP,
    GET_EMAIL_SENT: BASE_URL + GET_EMAIL_SENT,
    DISCONNECT: BASE_URL + DISCONNECT,
    INSERT_CHANNELS: BASE_URL + INSERT_CHANNELS,
    DELETE_CHANNELS: BASE_URL + DELETE_CHANNELS,
    MARK_SEEN: BASE_URL + MARK_SEEN,
    SEND_MAIL: BASE_URL + SEND_MAIL,
    UPDATE_USER: BASE_URL + UPDATE_USER,
}