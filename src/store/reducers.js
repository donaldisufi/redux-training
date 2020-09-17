import { combineReducers } from "redux";
import blogsReducer from '../saga/app/blogs/index.js';

const rootReducer = combineReducers({
    app: combineReducers({
        blogs: blogsReducer,
    })
});

export default rootReducer;