import { select, call } from 'redux-saga/effects';
import axios from 'axios';

import AppConfig from 'app/config';

/**
 * Iterate through object items
 * @returns Array()
 */
export function* iterate(obj) {
    const keys = Object.keys(obj);
    for (let a = 0; a < keys.length; a += 1) {
        const key = keys[a];
        yield [key, obj[key]];
    }
}

/**
 * Creates http headers object to add to every http call
 *
 * @returns
 */
function* getHeaders() {
    const headers = {
        'Authorization': `Token ${AppConfig.environment.authorizationToken}`,
    };

    return headers;
}

const responseHandler = fetchPromise => fetchPromise.then(
    response => ({
        response,
    }),
).catch(error => ({
    error,
}));

const buildRequestConfig = (config) => {
    const requestConfig = {
        ...config,
    };

    return requestConfig;
};

export const Get = (url, headers) => responseHandler(
    axios(buildRequestConfig({
        method: 'get',
        url,
        timeout: AppConfig.timeout,
        headers,
    })),
);

export const Post = (url, headers, data) => responseHandler(
    axios(buildRequestConfig({
        method: 'post',
        url,
        timeout: AppConfig.timeout,
        data,
        headers,
    })),
);

export const Put = (url, headers, data) => responseHandler(
    axios(buildRequestConfig({
        method: 'put',
        url,
        timeout: AppConfig.timeout,
        data,
        headers,
    })),
);
export const Delete = (url, headers) => responseHandler(
    axios(buildRequestConfig({
        method: 'delete',
        url,
        timeout: AppConfig.timeout,
        headers,
    })),
);


/**
 * Constructs url with given endpoint and action
 * @param endpoint
 * @param action
 * @returns String
 */
export function constructUrl({ endpoint, fieldsEnums, ...kwargs }) {
    // Replace endpoint :params: with data
    const re = /(:\w+:)/g;
    const params = endpoint.match(re);
    let url = endpoint;
    if (params) {
        params.forEach((paramType) => {
            const param = paramType.replace(/:/g, '');
            url = url.replace(paramType, kwargs.data[param] || '');
        });
    }

    return AppConfig.environment.apiUrl + url;
}

/**
 * Load Api Data
 */
export function* reader({ apiAction, actionKey, ...kwargs }) {
    // Create URL
    const url = constructUrl({ endpoint: apiAction.endpoint, ...kwargs });

    // Get headers
    const headers = yield getHeaders({ ...kwargs, url });

    // Fetch data from the server
    if (AppConfig.environment.apiDebugOutput) {
        // eslint-disable-next-line no-console
        console.log('Get', url, headers, kwargs.data);
    }
    return yield call(Get, url, headers);
}

/**
 * Create Api object
 */
export function* creator({ apiAction, actionKey, ...kwargs }) {
    // Create URL
    const url = constructUrl({ endpoint: apiAction.endpoint, ...kwargs });

    // Get headers
    const headers = yield getHeaders({ ...kwargs, url });

    if (kwargs.rawData) {
        if (AppConfig.environment.apiDebugOutput) {
            // eslint-disable-next-line no-console
            console.log('Post RAW', url, headers);
        }
        return yield call(Post, url, headers, kwargs.rawData);
    }

    if (AppConfig.environment.apiDebugOutput) {
        // eslint-disable-next-line no-console
        console.log('Post', url, headers, kwargs.data);
    }
    return yield call(Post, url, headers, kwargs.data);
}

/**
 * Update Api object
 */
export function* updater({ apiAction, actionKey, ...kwargs }) {
    // Create URL
    const url = constructUrl({ endpoint: apiAction.endpoint, ...kwargs });

    // Get headers
    const headers = yield getHeaders({ ...kwargs, url });

    if (AppConfig.environment.apiDebugOutput) {
        // eslint-disable-next-line no-console
        console.log('Put', url, headers, kwargs.data);
    }
    return yield call(Put, url, headers, kwargs.data);
}

/**
 * Delete Api object
 */
export function* deleter({ apiAction, actionKey, ...kwargs }) {
    // Create URL
    const url = constructUrl({ endpoint: apiAction.endpoint, ...kwargs });

    // Get headers
    const headers = yield getHeaders({ ...kwargs, url });

    if (AppConfig.environment.apiDebugOutput) {
        // eslint-disable-next-line no-console
        console.log('Delete', url, headers);
    }
    return yield call(Delete, url, headers);
}
