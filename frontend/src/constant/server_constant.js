const BASE_URL = 'http://localhost:3001';
const SIGNIN = '/api/post/signin';
const SIGNUP = '/api/post/signup';
const GET_USER = '/api/post/user';
const UPDATE_USER = '/api/post/update/user';
const CONNECT_IMAP = '/api/post/imap'
const GET_ALL_EMAIL_BY_ID = '/api/post/imap/emails/all';
const GET_EMAIL_BY_ADDRESS = '/api/post/imap/emails/from/';
const GET_EMAIL_UNSEEN = '/api/post/imap/emails/unseen';
const GET_SENT_EMAIL_BY_ADDRESS = '/api/post/imap/emails/sent/';
const GET_EMAIL_SENT = '/api/post/imap/emails/sent';
const GET_ALL_EMAIL_BY_ADDRESS = '/api/post/imap/emails/all/';
const DISCONNECT = '/api/post/imap/disconnect';
const INSERT_CHANNELS = '/api/post/channels/insert';
const DELETE_CHANNELS = '/api/post/channels/delete';
const MARK_SEEN = '/api/post/imap/mark/seen';

export default {
    BASE_URL: BASE_URL,
    SIGNIN: BASE_URL + SIGNIN,
    SIGNUP: BASE_URL + SIGNUP,
    GET_USER: BASE_URL + GET_USER,
    UPDATE_USER: BASE_URL + UPDATE_USER,
    CONNECT_IMAP: BASE_URL + CONNECT_IMAP,
    GET_ALL_EMAIL_BY_ID: BASE_URL + GET_ALL_EMAIL_BY_ID,
    GET_EMAIL_BY_ADDRESS: BASE_URL + GET_EMAIL_BY_ADDRESS,
    GET_EMAIL_UNSEEN: BASE_URL + GET_EMAIL_UNSEEN,
    GET_SENT_EMAIL_BY_ADDRESS: BASE_URL + GET_SENT_EMAIL_BY_ADDRESS,
    GET_EMAIL_SENT: BASE_URL + GET_EMAIL_SENT,
    GET_ALL_EMAIL_BY_ADDRESS: BASE_URL + GET_ALL_EMAIL_BY_ADDRESS,
    DISCONNECT: BASE_URL + DISCONNECT,
    INSERT_CHANNELS: BASE_URL + INSERT_CHANNELS,
    DELETE_CHANNELS: BASE_URL + DELETE_CHANNELS,
    MARK_SEEN: BASE_URL + MARK_SEEN,
}