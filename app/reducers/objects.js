import { actionsSettings } from 'app/actions';

import { uniqueArrayByPropertyValue } from 'app/helpers';

export const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsSettings.api.objects.load.SUCCESS:
            return uniqueArrayByPropertyValue({array: [
                ...state,
                ...action.data.objects,
            ]});
        case actionsSettings.api.objects.createObject.SUCCESS:
            return uniqueArrayByPropertyValue({array: [
                ...state,
                {
                    ...action.data.object,
                },
            ]});
        case actionsSettings.api.objects.deleteObject.SUCCESS: {
            const newState = [
                ...state,
            ];
            // Delete bucket from array
            const objectIndex = newState.findIndex(item => item.id === action.requestData.object);

            if (objectIndex !== -1) {
                newState.splice(objectIndex, 1);
            }
            return newState;
        }
        default:
            return state;
    }
};
