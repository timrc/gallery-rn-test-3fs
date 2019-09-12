import AppConfig from 'app/config';
import { ApiAction } from './common';

const prefix = 'LOCATIONS';

const config = {
    // Locations
    load: [`${prefix}_LOCATIONS`, 'LOAD', AppConfig.endpoints.locations],
};

const actions = {};
const settings = {};
const actionTypes = Object.keys(config);
for (let a = 0; a < actionTypes.length; a += 1) {
    ApiAction(actions, settings, actionTypes[a], ...config[actionTypes[a]]);
}

export default actions;
export { settings };
