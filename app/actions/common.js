// @flow
import AppConfig, { ACTIONS_CONFIG_CACHE } from 'app/config';
import { AVAILABLE_ACTION_STATUSES, HTTP_VERB_MAPPING } from './constants';

/**
 * App action creator
 */
export const AppAction = (actions, settings, name, module, action, data) => {
    const actionStatuses = {};
    Object.keys(AVAILABLE_ACTION_STATUSES).reduce((statuses, status) => {
        statuses[status] = `${AppConfig.appActionsPrefix}/${module}/${action}/$${status}$`;
        return statuses;
    }, actionStatuses);

    /**
     * Action
     * @param kwargs {{data}}
     */
    actions[name] = ({ ...kwargs }) => ({
        type: actionStatuses.REQUEST,
        statuses: actionStatuses,
        module,
        action,
        ...kwargs,
        data: {
            ...kwargs.data,
            ...data,
        },
    });

    // Create action settings
    settings[name] = {
        ...actionStatuses,
        module,
        action,
    };
};



/**
 * Api action creator
 */
export const ApiAction = (
    actions: Object,
    settings: Object,
    name: string,
    module: string,
    action: string,
    endpoint: string,
    verb?: string,
    data?: Object | null,
    keyGenerator?: Function,
) => {
    const actionStatuses = {};
    Object.keys(AVAILABLE_ACTION_STATUSES).reduce((statuses, status) => {
        statuses[status] = `${AppConfig.apiActionsPrefix}/${module}/${action}/$${status}$`;
        return statuses;
    }, actionStatuses);

    /**
     * Action
     * @param kwargs {{forceReload}, {data}}
     */
    actions[name] = ({ ...kwargs }) => ({
        ...kwargs,
        type: actionStatuses.REQUEST,
        data: {
            ...kwargs.data,
            ...data,
        },
    });

    // Create action settings
    const actionSetting = {
        ...actionStatuses,
        module,
        action,
        endpoint,
        keyGenerator,
        verb: verb || HTTP_VERB_MAPPING[action],
    };
    settings[name] = actionSetting;
    ACTIONS_CONFIG_CACHE[actionStatuses[AVAILABLE_ACTION_STATUSES.REQUEST]] = actionSetting;
};
