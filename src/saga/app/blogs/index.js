import produce from 'immer';
import { takeLatest, put, call, delay,select } from 'redux-saga/effects';
import createAction from '../../../utils/action-creator';
import fetchAsync from '../../../utils/fetchPromise';

const BLOGS_PER_PAGE = 2;

/**
 * Constants
 */
export const REQUEST = '@app/blogs/index/REQUEST';
export const REQUEST_PAGE = '@app/blogs/index/REQUEST_PAGE';
export const SET_LIST = '@app/blogs/index/SET_LIST';
export const SET_IS_LOADING = '@app/blogs/index/SET_IS_LOADING';
export const SET_ERROR = '@app/blogs/index/SET_ERROR';
export const REMOVE = '@app/blogs/index/REMOVE';
export const SEARCH = '@app/blogs/index/SEARCH';
export const EDIT_BLOG = '@app/blogs/index/EDIT_BLOG';
export const APPEND = '@app/blogs/index/APPEND';
export const APPEND_LIST = '@app/blogs/index/APPEND_LIST';
export const SET_HAS_MORE = '@app/blogs/index/SET_HAS_MORE';
export const SET_PAGE = '@app/blogs/index/SET_PAGE';

/**
 * Default State
 */
const _state = {
    list: [],
    isLoading: false,
    error: null,
    isLoadingEdit: false,
    errorEdit: null,
    hasMore: false,
    page: 1,
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
            case APPEND: {
                draft.list.push(action.payload);
                break;
            }
            case APPEND_LIST: {
                draft.list.push(...action.payload);
                break;
            }
            case SET_HAS_MORE: {
                draft.hasMore = action.payload;
                break;
            }
            case SET_PAGE: {
                draft.page = action.payload;
                break;
            }
            default:
                break;
        }
    })
);
export default reducer;

/**
 * Selectors 
 */
const getAllBlogs = state => state.app.blogs.list;

/**
 * Action Creators
 */
export const actions = {
    setList: (payload) => createAction(SET_LIST, { payload }),
    setIsLoading: (payload) => createAction(SET_IS_LOADING, { payload }),
    setError: (payload) => createAction(SET_ERROR, { payload }),
    request: () => createAction(REQUEST),
    requestPage: (payload) => createAction(REQUEST_PAGE, { payload }),
    remove: (payload) => createAction(REMOVE, { payload }),
    requestSearch: (payload) => createAction(SEARCH, { payload }),
    editBlog:(payload) => createAction(EDIT_BLOG,{payload}),

    append: (payload) => createAction(APPEND, { payload }),
    setHasMore: (payload) => createAction(SET_HAS_MORE, { payload }),
    appendList: (payload) => createAction(APPEND_LIST, { payload }),
    setPage: (payload) => createAction(SET_PAGE, { payload }),
};

/**
 * Selectors
 **/
export const getPage = (state) => state.app.blogs.list.page;
export const getHasMore = (state) => state.app.blogs.list.hasMore;

/**
 * Sagas
 **/
const sagas = {
    * request() {
        yield put(actions.setIsLoading(true));
        try {
            const response = yield call(fetchAsync,"/api/blogs/1");
            const { blogs, hasMore } = response;
            yield put(actions.setHasMore(hasMore))
            yield put(actions.setList(blogs));
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
    * editBlog({ payload }) {
        try {
            const blogList = select(getAllBlogs).map(item => item.id===payload.id?payload:item);
            yield put(actions.setList(blogList));
        } catch (error) {
            console.log("error ",error);
        }
    },
    * requestPage({ payload }) {
        yield put(actions.setIsLoading(true));
        console.log('page being requested', payload)
        try {
            const response = yield call(fetchAsync,`/api/blogs/${payload}`);
            const { blogs, hasMore } = response;
            yield put(actions.setHasMore(hasMore));
            yield put(actions.setPage(payload));
            yield put(actions.appendList(blogs));
        } catch (e) {
            yield put(actions.setError(e.toString()));
        }
        finally {
            yield put(actions.setIsLoading(false));
        }
    }
}

export const watcher = function* w() {
    yield takeLatest(REQUEST, sagas.request);
    yield takeLatest(SEARCH, sagas.requestSearch);
    yield takeLatest(EDIT_BLOG,sagas.editBlog);
    yield takeLatest(REQUEST, sagas.request);
    yield takeLatest(REQUEST_PAGE, sagas.re);
}
