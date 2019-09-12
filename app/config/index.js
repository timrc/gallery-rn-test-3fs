// @flow
import {
    Platform,
    Dimensions,
} from 'react-native';
import { apiUrl } from './endpoints/constants';
import endpoints from './endpoints';

// This is used as a singleton for action config, populated on runtime
export const ACTIONS_CONFIG_CACHE = {};

// Action settings
const DEFAULT_REQUEST_TIMEOUT = 15000;
const REDUX_STORE_PREFIX_PATH = [];

// Environment settings
const ENVIRONMENT_SETTINGS = {
    common: {
        debugOutput: true,
        apiDebugOutput: true,
        apiUrl: 'https://challenge.3fs.si/',
        authorizationToken: '34ADF2DD-70EC-4343-BB36-DCF980D14039',
    },
};

const env = 'common';

const environment = {
    ...ENVIRONMENT_SETTINGS.common,
    ...ENVIRONMENT_SETTINGS[env],
};

// Platform
const window = Dimensions.get('window');

export default {
    // Platform
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',

    isIPhoneX: (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((window.height === 812 || window.width === 812) || (window.height === 896 || window.width === 896))
    ),
    isIPhone5: (
        Platform.OS === 'ios'
        && !Platform.isPad
        && !Platform.isTVOS
        && window.width === 320
    ),

    platformVersion: Platform.Version,
    platformOS: Platform.OS,

    // Window Dimensions
    window: {
        width: window.width,
        height: window.height,
    },

    // Environment
    env,
    environment,

    // Action settings
    endpoints,
    timeout: DEFAULT_REQUEST_TIMEOUT,
    apiActionsPrefix: '@API',
    appActionsPrefix: '@APP',
};
