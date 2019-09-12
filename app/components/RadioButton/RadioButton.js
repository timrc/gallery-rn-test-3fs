import React, { Component } from 'react';
import { View } from 'react-native';

// Config
import styles from './styles';

const RadioButton = ({ style, selected }) => {
    return (
        <View style={[styles.container, style]}>
            {selected ? <View style={styles.selected }/> : null}
        </View>
    );
}

export default RadioButton;
