import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Components
import SwipeableListItem from 'app/components/SwipeableListItem';

// Config
import styles from './styles';

type Props = {
    id: string,
    name: string,
    location: {
        id: stirng,
        name: string,
    },
    onPress: Function,
};

const ListView = ({ id, name, location, onPress }) => {
    const hasLocationName = location && location.name;

    return (
        <View style={styles.wrapper}>
            <SwipeableListItem onPress={(cb) => onDeletePress(id, cb)}>
                <TouchableOpacity onPress={() => onPress(id)}>
                    <View style={styles.container}>
                        <Text style={styles.name}>{name}</Text>
                        {hasLocationName && <Text style={styles.location}>{location.name}</Text>}
                    </View>
                </TouchableOpacity>
            </SwipeableListItem>
        </View>
    );
};

export default ListView;
