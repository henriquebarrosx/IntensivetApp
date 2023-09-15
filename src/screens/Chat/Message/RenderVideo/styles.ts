import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    root: {
        padding: 8,
        maxHeight: 250,
        marginBottom: 12,
        height: 250,
        width: 265,
        borderWidth: 0,
        borderRadius: 6,
        maxWidth: "100%",
        alignSelf: "center",
        borderColor: "transparent",
    },
    playButtonContainer: {
        top: "50%",
        width: 50,
        height: 50,
        opacity: 0.8,
        borderRadius: 100,
        alignSelf: "center",
        position: "absolute",
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    icon: {
        alignSelf: "center",
    },
});