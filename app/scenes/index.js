// eslint-disable-next-line no-unused-vars
import React from 'react';

//
// App
//
import Buckets from './Buckets';
import AddNewBucket from './Buckets/AddNewBucket';
import Objects from './Objects';

/**
 * App scenes
 */
export default {
    Buckets: {
        screen: Buckets,
    },
    AddNewBucket: {
        screen: AddNewBucket,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    Objects: {
        screen: Objects,
    },
};
