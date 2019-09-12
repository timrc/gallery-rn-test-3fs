import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// Modules
import { connect } from 'react-redux';
import ActionSheet from 'react-native-action-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView, VibrancyView } from "@react-native-community/blur";

// Actions
import actions from 'app/actions';

// Selectors
import * as selectors from 'app/selectors';

// Views
import ListItem from 'app/views/buckets/ListItem';

// Components
import RadioButton from 'app/components/RadioButton';

// Types
import { BucketsDataType } from 'app/types/buckets';

// Config
import styles from './styles';

type BucketsType = {
    createBucket: Function,
    back: Function,
    locations: Array<any>,
};

const AddNewBucket = ({ back, locations, createBucket }) => {
    const [value, onChangeText] = React.useState('');
    const [selectedLocation, onLocationChange] = React.useState({});

    const createNewBucket = () => {
        createBucket({
            data: {
                name: value,
                location: selectedLocation.id,
            }
        });
    };

    return (
        <BlurView style={styles.container} blurType="light" blurAmount={10}>
            <View style={styles.popup}>
                <View style={styles.popupCloseContainer}>
                    <TouchableOpacity onPress={() => back()}>
                        <View style={styles.popupCloseButton}>
                            <Icon name="close" size={16} color="#999999" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.popupContainer}>
                    <TextInput
                        style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={text => onChangeText(text)}
                        placeholder="Bucket Name"
                        value={value}
                    />
                </View>
                <View style={styles.locations}>
                    {locations.map(location => (
                        <TouchableOpacity key={location.id} onPress={() => onLocationChange(location)}>
                            <View style={styles.location}>
                                <RadioButton selected={location.id === selectedLocation.id} />
                                <Text style={styles.locationText}>{location.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={createNewBucket}>
                    <View style={styles.createButtonContainer}>
                        <Text style={styles.createButtonText}>Create Bucket</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </BlurView>
    )
}

const mapStateToProps = state => ({
    locations: selectors.getLocations(state),
});

const mapDispatchToProps = {
    createBucket: actions.api.buckets.createBucket,
    back: actions.app.navigation.back,
};

// export default Buckets;
export default connect(mapStateToProps, mapDispatchToProps)(AddNewBucket);