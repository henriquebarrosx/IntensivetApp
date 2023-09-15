import React from "react"
import colors from "../../../utils/colors"
import { useChat } from "../../../context/ChatContext"
import { TouchableOpacity, StyleSheet } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"

export default function ScrollToEndButton() {
    const chatViewModel = useChat()

    return (
        <TouchableOpacity onPress={chatViewModel.scrollToBottom} style={styles.root}>
            <FontAwesome
                size={22}
                style={styles.icon}
                color={colors.gray}
                name="angle-double-down"
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: 35,
        right: 15,
        height: 35,
        bottom: 50,
        elevation: 5,
        borderRadius: 100,
        position: "absolute",
        justifyContent: "center",
        backgroundColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    icon: {
        alignSelf: "center",
    },
})
