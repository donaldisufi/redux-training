import produce from 'immer';
import { takeLatest, put, call, delay, } from 'redux-saga/effects';
import createAction from '../../../utils/action-creator';
import fetchAsync from '../../../utils/fetchPromise';

/**
 * Constants
 */
export const REQUEST = '@app/blogs/index/REQUEST';
export const SET_LIST = '@app/blogs/index/SET_LIST';
export const SET_IS_LOADING = '@app/blogs/index/SET_IS_LOADING';
export const SET_ERROR = '@app/blogs/index/SET_ERROR';
export const REMOVE = '@app/blogs/index/REMOVE';
export const SEARCH = '@app/blogs/index/SEARCH';


/**
 * Default State
 */
const _state = {
    list: [],
    isLoading: false,
    error: null,
    isLoadingEdit:false,
    errorEdit:null
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
            case REMOVE: {
                draft.list = draft.list.filter(blog => blog.id !== action.payload);
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
    remove: (payload) => createAction(REMOVE, { payload }),
    requestSearch: (payload) => createAction(SEARCH, { payload })
};

/**
 * Sagas
 **/

const sagas = {
    * request() {
        yield put(actions.setIsLoading(true));

        try {
            const response = yield call(fetchAsync, "/blogs/edit/:id");
            yield put(actions.setList(response.blogs));
        } catch (e) {
            yield put(actions.setError(e.toString()));
        }
        finally {
            yield put(actions.setIsLoading(false));
        }
    },
    * requestSearch({ payload }) {
        yield put(actions.setIsLoading(true));

        try {
            let response = yield call(fetchAsync, "/api/blogs");
            yield put(actions.setList(response.blogs.filter(item => item.title.toLowerCase().includes(payload.toLowerCase().trim()))));
        } catch (e) {
            yield put(actions.setError(e.toString()));
        }
        finally {
            yield put(actions.setIsLoading(false));
        }
    },
    editBlog({payload}){
        
    }
}

export const watcher = function* w() {
    yield takeLatest(REQUEST, sagas.request);
    yield takeLatest(SEARCH, sagas.requestSearch);
}
