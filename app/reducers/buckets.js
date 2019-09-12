import { actionsSettings } from 'app/actions';

import { uniqueArrayByPropertyValue } from 'app/helpers';

export const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsSettings.api.buckets.load.SUCCESS:
            return uniqueArrayByPropertyValue({array: [
                ...state,
                ...action.data.buckets,
            ]});
        case actionsSettings.api.buckets.createBucket.SUCCESS:
            return uniqueArrayByPropertyValue({array: [
                ...state,
                {
                    ...action.data,
                },
            ]});
        case actionsSettings.api.buckets.loadBucket.SUCCESS: {
            const newState = [
                ...state,
            ];

            // findIndex not a function
            const bucketIndex = newState.findIndex(item => item.id === action.requestData.bucket);

            if (bucketIndex !== -1) {
                newState[bucketIndex] = {
                    ...action.data.bucket,
                };
            }
            else {
                newState.push({
                    ...action.data.bucket,
                });
            }
            return newState;
        }
        case actionsSettings.api.buckets.deleteBucket.SUCCESS: {
            const newState = [
                ...state,
            ];
            // Delete bucket from array
            const bucketIndex = newState.findIndex(item => item.id === action.requestData.bucket);

            if (bucketIndex !== -1) {
                newState.splice(bucketIndex, 1);
            }
            return newState;
        }
        default:
            return state;
    }
};
