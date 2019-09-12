
import { StyleSheet } from 'react-native';

import AppConfig from 'app/config';

export default StyleSheet.create({
    wrapper: {
        width: AppConfig.window.width,
    },
    container: {
        height: 60,
        backgroundColor: '#6cd4fe',
        justifyContent: 'center',
    },
    statusBar: {
        height: AppConfig.isIPhoneX ? 50 : 20,
        backgroundColor: '#6cd4fe',
    },
});
