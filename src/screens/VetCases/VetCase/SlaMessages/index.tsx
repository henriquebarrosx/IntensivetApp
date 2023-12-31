import React from "react"
import { TouchableOpacity, View, Text } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"
import { useTimer } from "./useTimer"
import { useSlaMessage } from "./script"
import { VetCaseModel } from "../../../../schemas/VetCase"

interface Props {
    vetCase: VetCaseModel
    navigateToChat: () => void
}

export default function SlaMessage({ vetCase, navigateToChat }: Props) {
    const { timeLeft } = useTimer(vetCase)
    const { isFullCase, bubbleTitle, priorityColor, containerStyle } = useSlaMessage(vetCase)

    return (
        <TouchableOpacity onPress={navigateToChat} style={[styles.root, containerStyle]}>
            <View style={styles.midSide}>
                <View style={styles.header}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.identification}>
                        {bubbleTitle}
                    </Text>
                </View>

                <Text style={styles.petName} ellipsizeMode="tail" numberOfLines={1}>
                    {vetCase.pet.name}
                </Text>

                <View style={styles.slaTimerContainer}>
                    <MaterialCommunityIcons name="timer" color="#757575" size={18} style={styles.clockIcon} />
                    <Text style={styles.stopWatch}>{timeLeft}</Text>
                </View>
            </View>

            {isFullCase && (
                <View style={styles.classification}>
                    <MaterialCommunityIcons name="stethoscope" color={priorityColor} size={18} />
                </View>
            )}
        </TouchableOpacity>
    )
}
