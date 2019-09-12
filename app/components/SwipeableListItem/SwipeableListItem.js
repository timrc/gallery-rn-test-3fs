import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Modules
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

// Config
import styles from './styles';

class SwipeableListItem extends Component {
    renderRightAction = (view, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
    
        const pressHandler = () => {
            this.props.onPress(() => this.close());
        };
    
        return (
            <Animated.View style={[styles.rightAction, { transform: [{ translateX: trans }] }]}>
                <TouchableOpacity onPress={pressHandler}>
                    {view}
                </TouchableOpacity>
            </Animated.View>
        );
    };
  
    renderRightActions = progress => (
        <View style={styles.container}>
            {this.renderRightAction((
                <View style={styles.deleteContainer}>
                    <Icon name="trash-o" size={30} color="#ffffff" />
                </View>
            ), '#ff00ff', 64, progress)}
        </View>
    );

    updateRef = ref => {
        this._swipeableRow = ref;
    };

    close = () => {
        this._swipeableRow.close();
    };

    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                rightThreshold={40}
                renderRightActions={this.renderRightActions}
            >
                {children}
            </Swipeable>
        );
    }
}

export default  SwipeableListItem;
