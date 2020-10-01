import produce from "immer";
import createAction from "../../../utils/action-creator";
import {call, put, select, takeLatest} from "redux-saga/effects";

/**
 * Constants
 */
const SET_IS_LOGGED_IN = '@app/auth/index/SET_IS_LOGGED_IN';
const LOG_OUT = '@app/auth/index/LOG_OUT';

/**
 * Default State
 */
const _state = {
    isLoggedIn: true,
};

/**
 * Reducers
 */
const reducer = (state = _state, action) => (
    produce(state, draft => {
        switch (action.type) {
            case SET_IS_LOGGED_IN: {
                draft.isLoggedIn = action.payload;
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
    setIsLoggedIn: (payload) => createAction(SET_IS_LOGGED_IN, { payload }),
    logOut: () => createAction(LOG_OUT),
};

/**
 * Sagas
 **/

const sagas = {
    * logOut() {
        yield put(actions.setIsLoggedIn(false));
        // remove token from localStorage
    }
}

export const watcher = function* w() {
    yield takeLatest(LOG_OUT, sagas.logOut)
}