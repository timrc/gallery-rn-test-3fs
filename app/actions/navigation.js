import { Keyboard, Platform } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

/**
 * Go back by one or to the place in stack
 * @param scene - scene key
 */
export function back(scene) {
    if (Platform.OS === 'android') Keyboard.dismiss();
    const navigationProps = {};
    if (scene) navigationProps.key = scene;

    return NavigationActions.back({
        ...navigationProps,
    });
}

/**
 * navigate to the next scene
 * @param scene
 * @param params
 * @returns {{type, params: {transition: string}}}
 */
export function navigateTo({ scene, params }) {
    if (Platform.OS === 'android') Keyboard.dismiss();

    return NavigationActions.navigate({
        routeName: scene,
        params,
    });
}

/**
 * navigate to the next scene
 * @param scene
 * @param params
 * @returns {{type, params: {transition: string}}}
 */
export function navigate({ scene, params }) {
    return navigateTo({
        scene,
        params: {
            ...params,
            transition: 'slideFromRight',
        },
    });
}

/**
 * Show a modal scene
 * @param scene
 * @param params
 * @returns {{type, params}|*}
 */
export function modal({ scene, params }) {
    return navigateTo({
        scene,
        params: {
            ...params,
            transition: 'fade',
        },
    });
}