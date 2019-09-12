import AppConfig from 'app/config';
import { ApiAction } from './common';

const prefix = 'OBJECTS';

const config = {
    // Objects
    load: [`${prefix}_OBJECTS`, 'LOAD', AppConfig.endpoints.buckets.objects._],
    
    // Object
    createObject: [`${prefix}_OBJECT`, 'CREATE', AppConfig.endpoints.buckets.objects._],
    deleteObject: [`${prefix}_OBJECT`, 'REMOVE', AppConfig.endpoints.buckets.objects.object],
};

const actions = {};
const settings = {};

const actionTypes = Object.keys(config);
for (let a = 0; a < actionTypes.length; a += 1) {
    ApiAction(actions, settings, actionTypes[a], ...config[actionTypes[a]]);
}

export default actions;
export { settings };
