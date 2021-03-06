import state from '../state';

const initialState = state.mails;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INSERT_MAILS':
            return action.mails;
        case 'EMPTY_MAILS':
            return [];
        default:
            return state;
    }
}