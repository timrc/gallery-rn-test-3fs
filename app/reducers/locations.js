import { actionsSettings } from 'app/actions';

import { uniqueArrayByPropertyValue } from 'app/helpers';

export const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsSettings.api.locations.load.SUCCESS:
            return uniqueArrayByPropertyValue({array: [
                ...state,
                ...action.data.locations,
            ]});
        default:
            return state;
    }
};
