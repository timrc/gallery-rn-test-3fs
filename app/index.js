// @flow
/* globals navigator */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Provider, connect } from 'react-redux';

// Actions
import actions from 'app/actions';

// Components
import Toast from 'app/views/Toast';
// import AndroidBackButton from 'app/components/Navigation/AndroidBackButton';

// 
// !- Navigation
//
import { createStackNavigator } from 'react-navigation-stack';
import {
    createReduxContainer,
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// Selectors
import * as selectors from './selectors';

// Config
import AppScenes from './scenes';

import configureStore from './config/store';


// Local Relatives
import * as constants from './constants';
import styles from './styles';

/**
 * Navigation
 */

// Navigation stack
const AppNavigator = createStackNavigator(AppScenes, {
    ...constants.STACK_NAVIGATOR_CONFIG,
    initialRouteName: 'Buckets',
});

// Navigation reducers
const navigationReducer = createNavigationReducer(AppNavigator);

// Get state HOOK
const defaultGetStateForAction = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
    return defaultGetStateForAction(action, state);
};

// Navigation middleware
const middleware = createReactNavigationReduxMiddleware(
    state => state.navigation,
);

// Create state aware Navigator
const Navigator = createReduxContainer(AppNavigator);
const mapStateToPropsNavigator = state => ({
    state: state.navigation,
});
const AppWithNavigationState = connect(mapStateToPropsNavigator)(Navigator);
//
// !- END - Navigation
//

const AppConnected = () => {
    return (
        <View style={styles.wrapper}>
            <AppWithNavigationState />
            <Toast />
        </View>
    );
}

// eslint-disable-next-line react/no-multi-comp
const App = () => {
    const store = configureStore({
        navigation: navigationReducer,
    }, {}, [middleware]);
    // return (<View><Text style={{fontSize: 50, color: '#000000'}}>TEST</Text></View>);
    return (
        <Provider store={store}>
            <AppConnected dispatch={store.dispatch} />
        </Provider>
    );
};

export default App;
