// @flow
// Api specific actions
import locations, { settings as locationsSettings } from './locations';
import buckets, { settings as bucketsSettings } from './buckets';
import objects, { settings as objectsSettings } from './objects';

// App specific actions
import app, { settings as appSettings } from './app';
import * as navigation from './navigation';

export default {
    api: {
        locations,
        buckets,
        objects,
    },
    app: {
        ...app,
        navigation,
    }
};

const apiSettings = {
    locations: locationsSettings,
    buckets: bucketsSettings,
    objects: objectsSettings,
};

const settings = {
    ...appSettings,
};

const actionsSettings = {
    api: apiSettings,
    app: settings,
};


export { actionsSettings };
