import state from '../state';

const initialState = state.is_wrong;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_WRONG':
            return true;
        case 'MAKE_FINE':
            return false;
        default:
            return state;
    }
}