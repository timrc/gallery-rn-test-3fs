import { StyleSheet } from 'react-native';

import AppConfig from 'app/config';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    popup: {
        backgroundColor: '#ffffff',
        marginTop: 120,
        marginHorizontal: 24,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
        elevation: 1,
    },
    popupCloseContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 16,
    },
    popupCloseButton: {
        width: 32,
        height: 32,
        borderRadius: 32,
        borderColor: '#cccccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    createButtonContainer: {
        backgroundColor: '#3e9bf7',
        padding: 16,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    locations: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    location: {
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center',
    },
    locationText: {
        paddingLeft: 8,
        fontSize: 16,
        color: '#333333',
    },
});
