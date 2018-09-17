import state from '../state';

const initialState = state.channels;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INSERT_CHANNELS':
            return action.channels;
        case 'EMPTY_CHANNELS':
            return [];
        default:
            return state;
    }
}