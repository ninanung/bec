import state from '../state';

const initialState = state.is_wrong;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_WRONG':
            return Object.assign({}, state, {
                is_wrong: true,
            })
        case 'MAKE_FINE':
            return Object.assign({}, state, {
                is_wrong: false,
            })
        default:
            return state;
    }
}