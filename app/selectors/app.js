// @flow

export const getApp = state => state.app;
export const getToast = state => getApp(state).toast;