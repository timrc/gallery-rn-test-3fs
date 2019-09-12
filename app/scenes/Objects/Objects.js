import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Button } from 'react-native';

// Modules
import { connect } from 'react-redux';
import ActionSheet from 'react-native-action-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

// Actions
import actions from 'app/actions';

// Selectors
import * as selectors from 'app/selectors';

// Components
import Header from 'app/components/Header';
import ReloadButton from 'app/components/ReloadButton';

// Views
import ListItem from 'app/views/objects/ListItem';

// Types
import { ObjectsDataType } from 'app/types/objects';

// Config
import AppConfig from 'app/config';
import styles from './styles';

const createFormData = (photo) => {
    const data = new FormData();

    data.append('file', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === "android" ? photo.path : photo.path.replace("file://", ""),
    });

    // Object.keys(body).forEach(key => {
    //     data.append(key, body[key]);
    // });

    console.log('DATA');
    console.log(data);
    return data;
};

type ObjectsType = {
    loadObjects: Function,
    deleteObject: Function,
    navigate: Function,
    objects: Array<ObjectsDataType>,
};

class Objects extends Component<ObjectsType> {
    componentDidMount() {
        this.props.loadObjects({
            data: {
                bucket: this.props.bucket.id,
            }
        });
    }

    createNewObject = () => {
        ImagePicker.openPicker({}).then(photo => {
            console.log('TODO...');
            console.log(photo);
            // this.props.createObject({
            //     data: {

            //     }
            // });
            this.handleUploadPhoto(photo);
        });
    };


    handleUploadPhoto = (photo) => {
        // TODO - This throws some errors...
        fetch(`${AppConfig.environment.apiUrl}${AppConfig.endpoints.buckets.objects._.replace(':bucket:', this.props.bucket.id)}`, {
            method: "POST",
            headers: {
                'Authorization': `Token ${AppConfig.environment.authorizationToken}`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: createFormData(photo),
        })
            .then(response => response.json())
            .then(response => {
                console.log("upload succes", response);
            })
            .catch(error => {
                console.log("upload error", error);
            });
    };
    
    onReloadData = () => {
        this.props.loadObjects({
            data: {
                bucket: this.props.bucket.id,
            }
        });
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
            title: 'Delete object?',
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'blue'
        }, (buttonIndex) => {
            console.log('button clicked :', buttonIndex);

            if (buttonIndex === DESTRUCTIVE_INDEX) {
                this.props.deleteObject({
                    data: {
                        object: id,
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

    onBackPress = () => {
        this.props.back();
    };

    render() {
        const { objects, bucket, statuses } = this.props;
        const errorStatuses = ['FAILURE', 'ERROR'];
        const didFailedToLoadData = errorStatuses.includes(statuses.objects);

        return (
            <View style={styles.container}>
                <Header>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.onBackPress}>
                            <View style={styles.backContainer}>
                                <Icon name="chevron-left" size={20} color="#ffffff" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>{bucket.name}</Text>
                        <TouchableOpacity onPress={this.createNewObject}>
                            <View style={styles.deleteContainer}>
                                <Icon name="plus" size={20} color="#6cd4fe" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Header>
                <FlatList
                    data={objects}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <ListItem {...item} onDeletePress={this.onPress} onPress={this.onDeletePress} />}
                    horizontal={false}
                    numColumns={1}
                />
                {didFailedToLoadData && <ReloadButton onPress={this.onReloadData} style={styles.reloadButton} />}
            </View>
        )
    }
}

const mapStateToProps = (state, params) => ({
    objects: selectors.getObjects(state),
    bucket: selectors.getBucket(state, params.navigation.state.params.id),
    statuses: {
        objects: selectors.getStatus(state, 'OBJETS_OBJECTS', '', 'LOAD'),
    },
});

const mapDispatchToProps = {
    loadObjects: actions.api.objects.load,
    deleteObject: actions.api.objects.deleteObject,
    back: actions.app.navigation.back,
    modal: actions.app.navigation.modal,
    navigate: actions.app.navigation.navigate,
};

// export default Objects;
export default connect(mapStateToProps, mapDispatchToProps)(Objects);