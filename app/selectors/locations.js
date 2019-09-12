// @flow
export const getLocations = state => state.locations;
export const getLocation = (state, id) => getLocations(state).find(item => item.id === id);