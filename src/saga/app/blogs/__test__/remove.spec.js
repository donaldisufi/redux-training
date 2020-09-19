import {expectSaga} from "redux-saga-test-plan";
import {actions, REQUEST, watcher, default as reducer } from "../remove";
import { actions as indexActions } from '../index';
import axios from 'axios';
import {call, put} from "redux-saga/effects";

const fakeResponse = {
    success: true
}
describe('sagas', () => {
    it('remove blogs', () => {
        return expectSaga(watcher, axios)
            .withReducer(reducer)
            .provide([
                [call(axios.delete, '/api/blogs/1'), fakeResponse],
            ])
            .put(actions.setIsLoading(true))
            // .put(indexActions.remove(1))
            .put(actions.toggleModalVisibility())
            .put(actions.setRemoveId(null))
            .put(actions.setIsLoading(false))
            .dispatch({ type: REQUEST })
            .hasFinalState({
                modalVisibility: false,
                removeId: null,
                isLoading: false,
                error: null,
            })
            .run();
    })
})


    // .put(actions.setIsLoading(true))
    // .put(indexActions.remove(fakeResponse.blogs))
    // .put(actions.setIsLoading(false))