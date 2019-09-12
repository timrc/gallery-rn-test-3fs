import React, { Component } from 'react';
import {
    Animated, Text, View
} from 'react-native';

// Modules
import { connect } from 'react-redux';

// Selectors
import * as selectors from 'app/selectors';

// Local Relatives
import AppConfig from 'app/config';

// Local Relatives
import styles from './styles';

class Toast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(1),
            visible: false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            nextProps.toast
            && this.props.toast
            && nextProps.toast.message
            && this.props.toast.time !== nextProps.toast.time
        ) {
            this.setState({
                visible: true,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.visible && !prevState.visible) {
            this.showToast();
        }
    }

    showToast() {
        const duration = 700;

        Animated.sequence([
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration,
            }),
            Animated.timing(new Animated.Value(0), {
                toValue: 1,
                duration: AppConfig.toastTimeout,
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration,
            }),
        ]).start(() => {
            this.setState({
                visible: false,
            });
        });
    }

    render() {
        if (!this.state.visible) return null;

        return (
            <Animated.View
                style={[styles.container, {
                    opacity: this.state.opacity,
                    transform: [{
                        scale: this.state.opacity.interpolate({
                            inputRange: [
                                0, 0.3, 1,
                            ],
                            outputRange: [0, 1.04, 1],
                        }),
                    }],
                }]}
            >
                <View style={styles.content}>
                    <Text style={styles.text}>{this.props.toast.message}</Text>
                </View>
            </Animated.View>
        );
    }
}

const mapStateToProps = state => ({
    toast: selectors.getToast(state),
});

export default connect(mapStateToProps, null)(Toast);

