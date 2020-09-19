import { combineReducers } from "redux";
import blogsReducer from '../saga/app/blogs/index.js';
import blogRemoveReducer from '../saga/app/blogs/remove';

const rootReducer = combineReducers({
    app: combineReducers({
        blogs: combineReducers({
            list: blogsReducer,
            remove: blogRemoveReducer
        }),
    })
});

export default rootReducer;