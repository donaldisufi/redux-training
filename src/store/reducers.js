import { combineReducers } from "redux";
import blogsReducer from '../saga/app/blogs/index.js';
import blogRemoveReducer from '../saga/app/blogs/remove';
import blogEditReducer from '../saga/app/blogs/edit';

const rootReducer = combineReducers({
    app: combineReducers({
        blogs: combineReducers({
            list: blogsReducer,
            remove: blogRemoveReducer,
            edit:blogEditReducer
        }),
    })
});

export default rootReducer;