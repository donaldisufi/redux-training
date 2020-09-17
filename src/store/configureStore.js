import { createStore, compose } from 'redux';
import rootReducer from './reducers';

export default function configureStore() {
    return createStore(rootReducer, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));
};