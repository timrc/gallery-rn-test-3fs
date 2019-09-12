// @flow

export const getBuckets = state => state.buckets;
export const getBucket = (state, id) => getBuckets(state).find(item => item.id === id);
