import AppConfig from 'app/config';

import { settings as actions } from 'app/actions';

export const initialState = {};

/**
 * Update resource state
 * @param action
 * @param state
 * @param stateKeys
 * @param actionType
 * @param status
 */
const updateStates = (action, state, stateKeys, actionType, status) => {
    stateKeys.forEach((stateKey) => {
        const stateStatus = state[stateKey] || {};

        state[stateKey] = {
            ...stateStatus,
            [actionType]: {
                status,
                time: (new Date()).getTime(),
            },
        };
    });
};

export default (state = initialState, action) => {
    if (!action.actionKey) {
        return state;
    }
    if (!action.type.startsWith(AppConfig.apiActionsPrefix)) {
        return state;
    }

    // Extract action state
    const actionStatusRegex = /\$(\w+)\$/;
    /**
     * match = [$REQUESTED$, REQUESTED]
     * match = [SUCCESS, SUCCESS]
     * match = [FAILURE, FAILURE]
     */
    const match = action.type.match(actionStatusRegex);

    // Do not save DONE status
    if (match && match[1] === 'DONE') return state;

    const newState = {
        ...state,
    };

    const actionStatus = state[action.actionKey] || {};

    newState[action.actionKey] = {
        ...actionStatus,
        [action.apiAction.action]: {
            status: match[1],
            timestamp: (new Date()).getTime(),
        },
    };

    return newState;
};
