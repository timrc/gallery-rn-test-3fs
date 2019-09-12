// @flow
import {
    put,
    select,
    call,
} from 'redux-saga/effects';

import AppConfig, { ACTIONS_CONFIG_CACHE } from 'app/config';
import { AVAILABLE_ACTION_STATUSES } from 'app/actions/constants';

import {
    reader,
    creator,
    updater,
    deleter,
    statusSelector,
} from './helpers';

export default function* saga(action: any): Generator<*, *, *> {
    const apiAction = ACTIONS_CONFIG_CACHE[action.type];

    let objectKey = action.data ? action.data.id : null;
    if (!objectKey) {
        objectKey = action.id || objectKey;
    }
    const actionKey = `${apiAction.module}:${objectKey || ''}`;

    yield put({
        type: apiAction.REQUESTED,
        action,
        apiAction,
        actionKey,
    });

    let data;
    switch (apiAction.verb) {
        case 'GET':
            data = yield call(reader, {
                apiAction,
                actionKey,
                ...action,
            });
            break;
        case 'POST':
            data = yield call(creator, {
                apiAction,
                actionKey,
                ...action,
            });
            break;
        case 'PUT':
            data = yield call(updater, {
                apiAction,
                actionKey,
                ...action,
            });
            break;
        case 'DELETE':
            data = yield call(deleter, {
                apiAction,
                actionKey,
                ...action,
            });
            break;
        default:
            break;
    }

    let status = apiAction.SUCCESS;
    let doneData = null;
    let statusCode = null;

    if (data.error) {
        if (data.error.response) {
            status = apiAction.FAILURE;
            doneData = data.error.response.data;
            statusCode = data.error.response.status;

            yield put({
                type: apiAction.FAILURE,
                actionKey,
                data: data.error.response.data,
                statusCode,
                action,
                apiAction,
            });
        }
        else {
            status = apiAction.ERROR;
            yield put({
                type: apiAction.ERROR,
                actionKey,
                error: data.error.message,
                action,
                apiAction,
            });
        }
    }
    else {
        doneData = data.response.data;
        statusCode = data.response.status;
        yield put({
            type: apiAction.SUCCESS,
            requestData: action.data,
            data: data.response.data,
            action,
            apiAction,
            actionKey,
        });
    }

    yield put({
        type: apiAction.DONE,
        requestData: action.data,
        data: doneData,
        status,
        statusCode,
        action,
        apiAction,
        actionKey,
    });
}
