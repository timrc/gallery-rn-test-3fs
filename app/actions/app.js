import AppConfig from 'app/config';
import { AppAction } from './common';

const prefix = 'APP';

const config = {
    showToastMessage: [prefix, 'SHOW_TOAST'],
};

const actions = {};
const settings = {};

const actionTypes = Object.keys(config);
for (let a = 0; a < actionTypes.length; a += 1) {
    AppAction(actions, settings, actionTypes[a], ...config[actionTypes[a]]);
}

export default actions;
export { settings };
