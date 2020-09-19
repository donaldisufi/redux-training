import produce from 'immer';
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import createAction from '../../../utils/action-creator';
import fetchAsync from '../../../utils/fetchPromise';

/**
 * Constants
 */
const REQUEST = '@app/blogs/index/REQUEST';
const SET_LIST = '@app/blogs/index/SET_LIST';
const SET_IS_LOADING = '@app/blogs/index/SET_IS_LOADING';
const SET_ERROR = '@app/blogs/index/SET_ERROR';

/**
 * Default State
 */
const _state = {
    list: [],
    isLoading: false,
    error: null,
}


/**
 * Reducers
 */
const reducer = (state = _state, action) => (
    produce(state, draft => {
        switch (action.type) {
            case SET_LIST: {
              draft.list = action.payload;
              break;
            }
            case SET_IS_LOADING: {
                draft.isLoading = action.payload;
                break;
            }
            case SET_ERROR: {
                draft.error = action.payload;
                break;
            }
            default:
                break;
        }
    })
);
export default reducer;

/**
 * Action Creators
 */
export const actions = {
    setList: (payload) => createAction(SET_LIST, { payload }),
    setIsLoading: (payload) => createAction(SET_IS_LOADING, { payload }),
    setError: (payload) => createAction(SET_ERROR, { payload }),
    request: () => createAction(REQUEST),
};

/**
 * Selectors
 **/

/**
 * Sagas
 **/

const sagas = {
    * request() {
        console.log('request called');
        yield put(actions.setIsLoading(true));

        try {
            const response = yield call(fetchAsync,"/api/blogs");
            yield put(actions.setList(response.blogs));
        } catch (e) {
           yield put(actions.setError(e.toString()));
        }
        finally {
            yield put(actions.setIsLoading(false));
        }
    }
}

export const watcher = function* w() {
    yield takeLatest(REQUEST, sagas.request)
}
