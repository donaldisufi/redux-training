import produce from 'immer';
import { takeLatest, put, call } from 'redux-saga/effects';
import createAction from '../../../utils/action-creator';
import { actions as indexActions } from './index';

import axios from 'axios';
/**
 * Constants
 */
export const REQUEST = '@app/blogs/add/REQUEST';
export const SET_IS_SUBMITTING = '@app/blogs/add/SET_IS_SUBMITTING';
export const SET_FORM_STATUS = '@app/blogs/add/SET_FORM_STATUS';


/**
 * Default State
 */
const _state = {
    isSubmitting: false,
    formStatus: null // { success: true }, { success: false, error: 'error message' } | null
}


/**
 * Reducers
 */
const reducer = (state = _state, action) => (
    produce(state, draft => {
        switch (action.type) {
            case SET_IS_SUBMITTING: {
                draft.isSubmitting = action.payload;
                break;
            }
            case SET_FORM_STATUS: {
                draft.formStatus = action.payload;
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
    setIsSubmitting: (payload) => createAction(SET_IS_SUBMITTING, { payload }),
    setFormStatus: (payload) => createAction(SET_FORM_STATUS, { payload }),
    request: (payload) => createAction(REQUEST, { payload }),
};

/**
 * Sagas
 **/

const sagas = {
    * request({ payload }) {
        yield put(actions.setIsSubmitting(true));
        yield put(actions.setFormStatus(null));

        try {
            const response = yield call(axios.post,'/api/blogs', payload);
            yield put(actions.setFormStatus({ success: true }));
            yield put(indexActions.append(response.data.blog));
        } catch (e) {
            yield put(actions.setFormStatus({ success: false, error: e.toString() }));
        }
        finally {
            yield put(actions.setIsSubmitting(false));
        }
    }
}

export const watcher = function* w() {
    yield takeLatest(REQUEST, sagas.request)
}
