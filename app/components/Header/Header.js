import React, { Component } from 'react';
import { View } from 'react-native';

// Config
import styles from './styles';

class Header extends Component {
    render() {
        const { children } = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.statusBar} />
                <View style={styles.container}>
                    {children}
                </View>
            </View>
        );
    }
}

export default Header;
