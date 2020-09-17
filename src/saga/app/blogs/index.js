import createAction from '../../../utils/action-creator';

/**
 * Constants
 */
const SET_LIST = '@app/blogs/index';
const SET_LIST_SOMETHING = '@app/blogs/index';

/**
 * Default State
 */
const _state = {
    list: [],
    isLoading: true,
    error: null,
}


/**
 * Reducers
 */
const reducer = (state = _state, action) => {
    switch (action.type) {
        case SET_LIST: {
           return { ...state, list: action.payload };
        }
        case SET_LIST_SOMETHING: {
            return { ...state, list: action.payload };
        }
        default:
            return state;
    }
};
export default reducer;

/**
 * Action Creators
 */
export const actions = {
    setList: (payload) => createAction(SET_LIST, { payload })
};

/**
 * Selectors
 **/

/**
 * Sagas
 **/