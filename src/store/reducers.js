import { combineReducers } from "redux";

import authReducer from '../saga/app/auth/index';

import blogsReducer from '../saga/app/blogs/index.js';
import blogRemoveReducer from '../saga/app/blogs/remove';
import blogEditReducer from '../saga/app/blogs/edit';
import blogAddReducer from '../saga/app/blogs/add';


const rootReducer = combineReducers({
    app: combineReducers({
        auth: combineReducers({
            index: authReducer,
        }),
        blogs: combineReducers({
            list: blogsReducer,
            remove: blogRemoveReducer,
            edit:blogEditReducer,
            add: blogAddReducer,
        }),
    })
});

export default rootReducer;