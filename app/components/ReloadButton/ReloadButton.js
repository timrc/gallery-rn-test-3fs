import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

// Components
import Icon from 'react-native-vector-icons/FontAwesome';

// Config
import styles from './styles';

const ReloadButton = ({ onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <Icon name="refresh" size={20} color="#ffffff" />
            </View>
        </TouchableOpacity>
    );
}

export default ReloadButton;
