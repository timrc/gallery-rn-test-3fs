
import { StyleSheet } from 'react-native';

import AppConfig from 'app/config';

export default StyleSheet.create({
    container: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#333333',
    },
});
