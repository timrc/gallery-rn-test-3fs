import AppConfig from 'app/config';
import { ApiAction } from './common';

const prefix = 'BUCKETS';

const config = {
    // Buckets
    load: [`${prefix}_BUCKETS`, 'LOAD', AppConfig.endpoints.buckets._],
    
    // Bucket
    createBucket: [`${prefix}_BUCKET`, 'CREATE', AppConfig.endpoints.buckets._],
    loadBucket: [`${prefix}_BUCKET`, 'LOAD', AppConfig.endpoints.buckets.bucket],
    deleteBucket: [`${prefix}_BUCKET`, 'REMOVE', AppConfig.endpoints.buckets.bucket],
};

const actions = {};
const settings = {};

const actionTypes = Object.keys(config);
for (let a = 0; a < actionTypes.length; a += 1) {
    ApiAction(actions, settings, actionTypes[a], ...config[actionTypes[a]]);
}

export default actions;
export { settings };
