import { all } from 'redux-saga/effects';

import { watcher as blogs } from './app/blogs/index';
import { watcher as blogAdd } from './app/blogs/add';
import { watcher as blogRemove } from './app/blogs/remove';

export default function* root() {
    yield all([
        blogs(),
        blogAdd(),
        blogRemove(),
    ])
}