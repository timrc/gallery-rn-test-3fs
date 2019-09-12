import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    container: {
        height: 80,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 20,
        paddingBottom: 8,
    },
    location: {
        fontSize: 16,
        fontWeight: '200',
        paddingLeft: 20,
    },
});
