import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 32,
        zIndex: 99,
        alignSelf: 'center',
    },
    content: {
        borderRadius: 16,
        margin: 24,
        backgroundColor: '#cccccc',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
    },
});
