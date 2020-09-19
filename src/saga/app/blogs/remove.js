import produce from 'immer';
import createAction from "../../../utils/action-creator";
import {call, put, takeLatest, select} from "redux-saga/effects";
import axios from 'axios';
import { actions as indexActions } from './index';

/**
 * Constants
 */
export const TOGGLE_MODAL_VISIBILITY = '@app/blogs/remove/TOGGLE_MODAL_VISIBILITY';
export const SET_REMOVE_ID = '@app/blogs/remove/SET_REMOVE_ID';
export const REQUEST = '@app/blogs/remove/REQUEST';
export const SET_IS_LOADING = '@app/blogs/remove/SET_IS_LOADING';
export const SET_ERROR = '@app/blogs/remove/SET_ERROR';

/**
 * Default State
 */
const _state = {
    modalVisibility: false,
    removeId: null,
    isLoading: false,
    error: null,
}

/**
 * Reducers
 */
const reducer = (state = _state, action) => (
    produce(state, draft => {
        switch (action.type) {
            case TOGGLE_MODAL_VISIBILITY: {
                draft.modalVisibility = !draft.modalVisibility;
                break;
            }
            case SET_REMOVE_ID: {
                draft.removeId = action.payload;
                break;
            }
            case SET_IS_LOADING: {
                draft.isLoading = action.payload;
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
export const getModalVisibility = (state) => state.app.blogs.remove.modalVisibility;
export const getRemoveId = (state) => state.app.blogs.remove.removeId;
export const getIsLoading = (state) => state.app.blogs.remove.isLoading;


/**
 * Action Creators
 */
export const actions = {
    toggleModalVisibility: () => createAction(TOGGLE_MODAL_VISIBILITY),
    setRemoveId: (payload) => createAction(SET_REMOVE_ID, { payload }),
    request: (payload) => createAction(REQUEST, { payload }),
    setIsLoading: (payload) => createAction(SET_IS_LOADING, { payload }),
    setError: (payload) => createAction(SET_ERROR, { payload }),
};

/**
 * Sagas
 **/

const sagas = {
    * request({ payload }) {
        yield put(actions.setIsLoading(true));
        try {
            const blogId = yield select(getRemoveId);
            yield call(axios.delete,`/api/blogs/${blogId}`);
            // yield put(indexActions.remove(blogId));
            yield put(actions.toggleModalVisibility());
            yield put(actions.setRemoveId(null));
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