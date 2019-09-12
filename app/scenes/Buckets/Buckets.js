import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Button } from 'react-native';

// Modules
import { connect } from 'react-redux';
import ActionSheet from 'react-native-action-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';

// Actions
import actions from 'app/actions';

// Selectors
import * as selectors from 'app/selectors';

// Components
import Header from 'app/components/Header';
import ReloadButton from 'app/components/ReloadButton';

// Views
import ListItem from 'app/views/buckets/ListItem';

// Types
import { BucketsDataType } from 'app/types/buckets';

// Config
import styles from './styles';

type BucketsType = {
    loadBuckets: Function,
    deleteBucket: Function,
    navigate: Function,
    buckets: Array<BucketsDataType>,
};

class Buckets extends Component<BucketsType> {
    componentDidMount() {
        this.props.loadLocations();
        this.props.loadBuckets();
    }

    createNewBucket = () => {
        this.props.modal({
            scene: 'AddNewBucket',
        });
    };

    onReloadData = () => {
        this.props.loadLocations();
        this.props.loadBuckets();
    };

    onDeletePress = (id, cb) => {
        console.log('id', id)

        var BUTTONS = [
            'Delete',
            'Cancel'
        ];
        
        var DESTRUCTIVE_INDEX = 0;
        var CANCEL_INDEX = 1;
        
        ActionSheet.showActionSheetWithOptions({
            title: 'Delete bucket?',
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'blue'
        }, (buttonIndex) => {
            console.log('button clicked :', buttonIndex);

            if (buttonIndex === DESTRUCTIVE_INDEX) {
                this.props.deleteBucket({
                    data: {
                        bucket: id,
                    },
                });
            }
            cb && cb();
        });
    }

    onPress = (id) => {
        this.props.navigate({
            scene: 'Objects',
            params: {
                id,
            },
        });
    };

    render() {
        const { buckets, statuses} = this.props;
        const errorStatuses = ['FAILURE', 'ERROR'];
        const didFailedToLoadData = errorStatuses.includes(statuses.buckets) || errorStatuses.includes(statuses.locations);

        return (
            <View style={styles.container}>
                <Header>
                    <View style={styles.header}>
                        <View style={styles.blankLeft} />
                        <Text style={styles.title}>Buckets</Text>
                        <TouchableOpacity onPress={this.createNewBucket}>
                            <View style={styles.deleteContainer}>
                                <Icon name="plus" size={20} color="#6cd4fe" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Header>
                <FlatList
                    data={buckets}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ListItem
                            {...item} 
                            onDeletePress={this.onDeletePress} 
                            onPress={this.onPress} 
                        />
                    )}
                    horizontal={false}
                    numColumns={1}
                />
                {didFailedToLoadData && <ReloadButton onPress={this.onReloadData} style={styles.reloadButton} />}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    buckets: selectors.getBuckets(state),
    statuses: {
        buckets: selectors.getStatus(state, 'BUCKETS_BUCKETS', '', 'LOAD'),
        locations: selectors.getStatus(state, 'LOCATIONS_LOCATIONS', '', 'LOAD'),
    },
});

const mapDispatchToProps = {
    loadLocations: actions.api.locations.load,
    loadBuckets: actions.api.buckets.load,
    deleteBucket: actions.api.buckets.deleteBucket,
    modal: actions.app.navigation.modal,
    navigate: actions.app.navigation.navigate,
};

// export default Buckets;
export default connect(mapStateToProps, mapDispatchToProps)(Buckets);