import { actionsSettings } from 'app/actions';

export const initialState = {
    toast: {
        message: '',
        time: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsSettings.app.showToastMessage.REQUEST:
            return {
                ...state,
                toast: {
                    message: action.data.message,
                    time: (new Date()),
                },
            };
        default:
            return state;
    }
};
