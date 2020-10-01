import produce from 'immer';
import createAction from "../../../utils/action-creator";
import { call, put, takeLatest, select } from "redux-saga/effects";
// import axios from 'axios';
import { actions as indexActions } from './index';
import fetchAsync from '../../../utils/fetchPromise';

/**
 * Constants
 */
export const EDIT_BLOG_REQUEST = '@app/blogs/edit/EDIT_BLOG_REQUEST';
export const SET_IS_LOADING_EDIT = '@app/blogs/edit/SET_IS_LOADING_EDIT';
export const SET_ERROR_EDIT = '@app/blogs/edit/SET_ERROR_EDIT';
export const TOGGLE_MODAL_VISIBILITY_EDIT = '@app/blogs/edit/TOGGLE_MODAL_VISIBILITY_EDIT';
export const SET_BLOG_ID = '@app/blogs/edit/SET_BLOG_ID';

/**
 * Default State
 */
const _state = {
    isLoading: false,
    error: null,
    modalVisibility: false,
    blogId: null
}

/**
 * Reducers
*/
// {id:1,title:'dasdasd',description:'asdasdasdasd'}
const reducer = (state = _state, action) => (
    produce(state, draft => {
        switch (action.type) {
            case TOGGLE_MODAL_VISIBILITY_EDIT: {
                draft.modalVisibility = !draft.modalVisibility;
                break;
            }
            case SET_IS_LOADING_EDIT: {
                draft.isLoading = action.payload
                break;
            }
            case SET_ERROR_EDIT: {
                draft.error = action.payload;
                break;
            }
            case SET_BLOG_ID: {
                draft.blogId = action.payload;
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
 **/
export const getIsLoadingEdit = state => state.app.blogs.edit.isLoading;
export const getErrorEditing = state => state.app.blogs.edit.error;
export const getEditModalVisibility = state => state.app.blogs.edit.modalVisibility;
export const getBlogId = state => state.app.blogs.edit.blogId;

/**
 * Action Creators
 */
export const actions = {
    editBlog: (payload) => createAction(EDIT_BLOG_REQUEST, payload),
    setLoading: (payload) => createAction(SET_IS_LOADING_EDIT, { payload }),
    setErrorEdtting: (payload) => createAction(SET_ERROR_EDIT, { payload }),
    toggleModalVisibility: () => createAction(TOGGLE_MODAL_VISIBILITY_EDIT),
    setBlogId: (payload) => createAction(SET_BLOG_ID, payload)
};

/**
 * Sagas
 **/

const sagas = {
    * editBlog({ payload }) {
        yield put(actions.setLoading(true));
        const id = yield select(getBlogId);

        try {
            const response = yield call(fetchAsync, `/api/blogs/${id}`, payload);
            indexActions.editBlog(response);

        } catch (error) {
            yield put(actions.setErrorEdtting(error));
        } 
        finally {
           yield put(actions.setLoading(false));
        }
    }
}

export const watcher = function* w() {
    yield takeLatest(EDIT_BLOG_REQUEST, sagas.editBlog)
}