import { all } from 'redux-saga/effects';

import { watcher as blogs } from './app/blogs/index';
import { watcher as blogRemove } from './app/blogs/remove';
import {watcher as editWatcher} from './app/blogs/edit';

export default function* root() {
    yield all([
        blogs(),
        blogRemove(),
        editWatcher()
    ])
}