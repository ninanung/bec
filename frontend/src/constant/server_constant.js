const BASE_URL = 'http://localhost:3000';
const SIGNIN = '/api/get/signin';
const SIGNUP = '/api/post/signup';
const GET_USER = '/api/get/user';
const UPDATE_USER = '/api/post/update/user';
const GET_ALL_EMAIL_BY_ID = '/api/get/imap/emails/all';
const GET_EMAIL_BY_ADDRESS = '/api/get/imap/emails/';
const GET_EMAIL_UNSEEN = '/api/get/imap/emails/unseen';
const GET_SENT_EMAIL_BY_ADDRESS = '/api/get/imap/emails/sent/';
const GET_EMAIL_SENT = '/api/get/ima[/emails/sent';
const GET_ALL_EMAIL_BY_ADDRESS = '/api/get/iamp/emails/all/';
const DISCONNECT = '/api/get/imap/disconnect';

export default {
    BASE_URL: BASE_URL,
    SIGNIN: BASE_URL + SIGNIN,
    SIGNUP: BASE_URL + SIGNUP,
    GET_USER: BASE_URL + GET_USER,
    UPDATE_USER: BASE_URL + UPDATE_USER,
    GET_ALL_EMAIL_BY_ID: BASE_URL + GET_ALL_EMAIL_BY_ID,
    GET_EMAIL_BY_ADDRESS: BASE_URL + GET_EMAIL_BY_ADDRESS,
    GET_EMAIL_UNSEEN: BASE_URL + GET_EMAIL_UNSEEN,
    GET_SENT_EMAIL_BY_ADDRESS: BASE_URL + GET_SENT_EMAIL_BY_ADDRESS,
    GET_EMAIL_SENT: BASE_URL + GET_EMAIL_SENT,
    GET_ALL_EMAIL_BY_ADDRESS: BASE_URL + GET_ALL_EMAIL_BY_ADDRESS,
    DISCONNECT: BASE_URL + DISCONNECT,
}