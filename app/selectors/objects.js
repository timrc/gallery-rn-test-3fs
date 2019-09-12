// @flow
export const getObjects = state => state.objects;
export const getObject = (state, id) => getObjects(state).find(item => item.id === id);