import { all } from 'redux-saga/effects';

import { watcher as blogs } from './app/blogs/index';

export default function* root() {
    yield all([
        blogs()
    ])
}