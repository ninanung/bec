import state from '../state';

const initialState = state.sent;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INSERT_SENT':
            return action.sent;
        case 'EMPTY_SENT':
            return [];
        default:
            return state;
    }
}