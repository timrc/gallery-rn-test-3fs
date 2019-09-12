import { Easing, Animated } from 'react-native';
import AppConfig from './';

export const SlideFromRightTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];

    const width = AppConfig.window.width;
    const outputRange = ([width / 2, 0, 0]);

    // Add [index - 1, index - 0.99] to the interpolated opacity for screen transition.
    // This makes the screen's shadow to disappear smoothly.
    const opacity = position.interpolate({
        inputRange: ([
            index - 1,
            index,
            index + 1,
        ]),
        outputRange: ([0, 1, 0]),
    });

    const translateY = 0;
    const translateX = position.interpolate({
        inputRange,
        outputRange,
    });

    return {
        opacity,
        transform: [
            { translateX },
            { translateY },
        ],
    };
};



export const FadeTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];

    const translateY = position.interpolate({
        inputRange,
        outputRange: ([-80, 0, 0]),
    });

    return {
        transform: [
            { translateY },
        ],
    };
};

const MyTransitionSpec = ({
    duration: 500,
    easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
    timing: Animated.timing,
});

export const NAVIGATE = 'slideFromRight';
export const MODAL = 'fade';

export default () => ({
    transitionSpec: MyTransitionSpec,
    screenInterpolator: (sceneProps) => {
        const { position, scene } = sceneProps;
        const { index, route } = scene;
        const params = route.params || {};
        const transition = params.transition || 'default';

        return {
            slideFromRight: SlideFromRightTransition(index, position),
            fade: FadeTransition(index, position),
            default: {},
        }[transition];
    },
});
