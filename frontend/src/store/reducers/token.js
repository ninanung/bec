import state from '../state';

const initialState = state.fcm_cloud_messaging_token;

export default (state=initialState, action) => {
    switch (action.type) {
        case 'INSERT_TOKEN':
            const token = action.token;
            return token;
        default:
            return state;
    }
}