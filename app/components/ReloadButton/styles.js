import { StyleSheet } from 'react-native';

import AppConfig from 'app/config';

export default StyleSheet.create({
    container: {
        backgroundColor: '#ffcccc',
        width: 64,
        height: 64,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
        elevation: 1,
    },
});
