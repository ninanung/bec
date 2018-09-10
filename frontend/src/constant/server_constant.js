const BASE_URL = 'http://localhost:3000';
const SIGNIN = '/api/signin';
const SIGNUP = '/api/signup';
const GET_USER = '/api/get/user';
const GET_ALL_EMAIL_BY_ADDRESS = '/api/get/email/all';
const GET_EMAIL_BY_ADDRESS = '/api/get/email/:address';
const GET_EMAIL_UNSEEN = '/api/get/email/unseen';
const GET_SENT_EMAIL_BY_ADDRESS = '/api/get/email/sent/:address';

export default {
    BASE_URL: BASE_URL,
    SIGNIN: BASE_URL + SIGNIN,
    SIGNUP: BASE_URL + SIGNUP,
    GET_USER: BASE_URL + GET_USER,
    GET_ALL_EMAIL_BY_ADDRESS: BASE_URL + GET_ALL_EMAIL_BY_ADDRESS,
    GET_EMAIL_BY_ADDRESS: BASE_URL + GET_EMAIL_BY_ADDRESS,
    GET_EMAIL_UNSEEN: BASE_URL + GET_EMAIL_UNSEEN,
    GET_SENT_EMAIL_BY_ADDRESS: BASE_URL + GET_SENT_EMAIL_BY_ADDRESS,
}