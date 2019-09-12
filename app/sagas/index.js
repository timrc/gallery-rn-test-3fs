import { fork, takeEvery } from 'redux-saga/effects';

import AppConfig from 'app/config';
import { AVAILABLE_ACTION_STATUSES } from 'app/actions/constants';

import requestSaga from './common';
import bucketsSagas from './buckets';

export default function* () {
    yield takeEvery(action => (
        action.type.startsWith(AppConfig.apiActionsPrefix)
        && action.type.endsWith(`$${AVAILABLE_ACTION_STATUSES.REQUEST}$`)
    ), requestSaga);
    yield fork(bucketsSagas);
}
