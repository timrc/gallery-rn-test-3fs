import { StyleSheet } from 'react-native';

import AppConfig from 'app/config';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    blankLeft: {
        marginLeft: 8,
        width: 32,
        height: 32,
    },
    backContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    },
    deleteContainer: {
        backgroundColor: '#ffffff',
        width: 32,
        height: 32,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    reloadButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
    },
});
