// @flow
import { apiUrl } from './constants';

export default {
    // Locations
    locations: `${apiUrl}locations`,

    // Buckets
    buckets: {
        // All buckets
        _: `${apiUrl}buckets`,
        // Single bucket
        bucket: `${apiUrl}buckets/:bucket:`,

        // Objects
        objects: {
            // All objects
            _: `${apiUrl}buckets/:bucket:/objects`,
            // Single object
            object: `${apiUrl}buckets/:bucket:/objects/:object:`,
        },
    },
};
