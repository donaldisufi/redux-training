import { combineReducers } from "redux";
import blogsReducer from '../saga/app/blogs/index.js';
import blogRemoveReducer from '../saga/app/blogs/remove';
import blogAddReducer from '../saga/app/blogs/add';

const rootReducer = combineReducers({
    app: combineReducers({
        blogs: combineReducers({
            list: blogsReducer,
            add: blogAddReducer,
            remove: blogRemoveReducer
        }),
    })
});

export default rootReducer;