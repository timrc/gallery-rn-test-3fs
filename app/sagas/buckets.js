import { delay } from 'redux-saga';
import { put, select, take, takeEvery } from 'redux-saga/effects';

// Actions
import actions, { actionsSettings } from 'app/actions';

const createBucket = function* createBucket(action) {
    if (action.status === actionsSettings.api.buckets.createBucket.SUCCESS) {
        // Navigate back
        yield put(actions.app.navigation.back());
    }

    // Error?
    if (action.status === actionsSettings.api.buckets.createBucket.FAILURE) {
        yield put(actions.app.showToastMessage({ data: { message: action.data.message } }));
    }
    else {
        yield put(actions.app.showToastMessage({ data: { message: 'Something went wrong!' } }));
    }
}

const errorChecking = function* errorChecking(action) {
    if (action.status !== action.apiAction.SUCCESS) {
        // Error?
        if (action.status === action.apiAction.FAILURE) {
            yield put(actions.app.showToastMessage({ data: { message: `[${action.apiAction.verb}] ${action.apiAction.endpoint} - ${action.data.message}` } }));
        }
        else {
            yield put(actions.app.showToastMessage({ data: { message: `[${action.apiAction.verb}] ${action.apiAction.endpoint} - Something went wrong!` } }));
        }
    }
}

/*
 * Root saga
 */
export default function* () {
    yield takeEvery(actionsSettings.api.buckets.load.DONE, errorChecking);
    yield takeEvery(actionsSettings.api.locations.load.DONE, errorChecking);

    yield takeEvery(actionsSettings.api.buckets.createBucket.DONE, createBucket);
}