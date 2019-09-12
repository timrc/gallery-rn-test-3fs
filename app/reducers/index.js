import { combineReducers } from 'redux';

import { actionsSettings } from 'app/actions';
import AppConfig from 'app/config';

import app from './app';
import locations from './locations';
import buckets from './buckets';
import objects from './objects';

import status from './status';

export default (reducers) => {
    const rootReducer = combineReducers({
        app,
        locations,
        buckets,
        objects,
        status,
        ...reducers,
    });

    return (state, action) => {
        if (AppConfig.debugOutput) {
            // eslint-disable-next-line no-console
            console.log('STORE SIZE:', `${JSON.stringify(state).length / 1024} KB`);
        }

        return rootReducer(state, action);
    };
};
