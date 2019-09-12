export type BucketLocationDataType = {
    id: string,
    name: string,
};

export type BucketsDataType = {
    id: string,
    name: string,
    location: BucketLocationDataType,
};