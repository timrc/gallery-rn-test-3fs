/* globals __DEV__ */
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'app/sagas';
import configureReducer from 'app/reducers';

import AppConfig from './';

let reduxLogger;
// eslint-disable-next-line no-undef
if (__DEV__) {
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    reduxLogger = require('redux-logger');
}

export default function configureStore(reducers, preloadedState = {}, middlewares = []) {
    const sagaMiddleware = createSagaMiddleware();

    // Load middleware
    let middleware = [
        sagaMiddleware,
        ...middlewares,
    ];

    // Dev-only middleware
    // eslint-disable-next-line no-undef
    if (__DEV__) {
        middleware = [
            ...middleware,
            // Logs state changes to the dev console
            reduxLogger.createLogger(),
        ];
    }
    // Init redux store (using the given reducer & middleware)
    const store = createStore(
        configureReducer(reducers),
        preloadedState,
        compose(
            applyMiddleware(...middleware),
        ),
    );

    store.runSaga = sagaMiddleware.run;
    store.runSaga(rootSaga);

    if (module.hot) {
        module.hot.accept(() => {
            // eslint-disable-next-line global-require
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer(reducers));
        });
    }

    return store;
}
