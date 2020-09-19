import { REQUEST, SET_LIST, SET_IS_LOADING, watcher } from "../index";
import { actions } from "../index";
import reducer from "../index";
import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import fetchAsync from "../../../../utils/fetchPromise";

describe('actions', () => {
    it('should create an action to set a list', () => {
        const list = [1, 2];
        const expectedAction = {
            type: SET_LIST,
            payload: list
        }
        expect(actions.setList(list)).toEqual(expectedAction)
    })
})

describe('blogs reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                list: [],
                isLoading: false,
                error: null,
            }
        )
    })

    it('should handle SET_IS_LOADING', () => {
        expect(
            reducer({
                list: [],
                isLoading: false,
                error: null,
            }, {
                type: SET_IS_LOADING,
                payload: true
            })
        ).toEqual({
            list: [],
            isLoading: true,
            error: null,
        })
        // expect(
        //     reducer(
        //         prevState,
        //         newState
        //     )
        // ).toEqual([
        //     {
        //         text: 'Run the tests',
        //         completed: false,
        //         id: 1
        //     },
        //     {
        //         text: 'Use Redux',
        //         completed: false,
        //         id: 0
        //     }
        // ])
    })
})

const fakeResponse = {
    blogs: [{
        title: 'first blog',
        description: 'something to read'
    }]
}

describe('sagas', () => {
    it('fetches blogs', () => {
        return expectSaga(watcher, fetchAsync)
            .provide([
                [call(fetchAsync, '/api/blogs'), fakeResponse],
            ])
            .put(actions.setIsLoading(true))
            .put(actions.setList(fakeResponse.blogs))
            .put(actions.setIsLoading(false))
            .dispatch({ type: REQUEST })
            .run();
    })
})