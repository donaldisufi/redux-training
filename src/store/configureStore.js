import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';

import rootReducer from './reducers';
import sagas from '../saga/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const middleware = [sagaMiddleware, logger];
    const store = createStore(
        rootReducer,
        compose(
                applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    // then run the saga
    sagaMiddleware.run(sagas);
    return store;
};