const BASE_URL = 'http://localhost:3000';
const SIGNIN = '/api/get/signin';
const SIGNUP = '/api/post/signup';
const GET_USER = '/api/get/user';
const UPDATE_USER = '/api/post/update/user';
const GET_ALL_EMAIL_BY_ADDRESS = '/api/get/email/all/:address';
const GET_EMAIL_BY_ADDRESS = '/api/get/email/:address';
const GET_EMAIL_UNSEEN = '/api/get/email/unseen';
const GET_SENT_EMAIL_BY_ADDRESS = '/api/get/email/sent/:address';

export default {
    BASE_URL: BASE_URL,
    SIGNIN: BASE_URL + SIGNIN,
    SIGNUP: BASE_URL + SIGNUP,
    GET_USER: BASE_URL + GET_USER,
    UPDATE_USER: BASE_URL + UPDATE_USER,
    GET_ALL_EMAIL_BY_ADDRESS: BASE_URL + GET_ALL_EMAIL_BY_ADDRESS,
    GET_EMAIL_BY_ADDRESS: BASE_URL + GET_EMAIL_BY_ADDRESS,
    GET_EMAIL_UNSEEN: BASE_URL + GET_EMAIL_UNSEEN,
    GET_SENT_EMAIL_BY_ADDRESS: BASE_URL + GET_SENT_EMAIL_BY_ADDRESS,
}