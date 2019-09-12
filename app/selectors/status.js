// @flow

//
// Status selector
//
// eslint-disable-next-line import/prefer-default-export
export const getStatus = (state, module, key, action) => {
    const actionKey = `${module}:${key || ''}`;
    const keyStatus = state.status[actionKey];
    if (!keyStatus) return null;

    if (action) {
        return keyStatus[action].status;
    }

    return keyStatus;
};
