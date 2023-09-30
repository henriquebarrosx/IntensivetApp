import { useState } from "react"
import { getBottomSpace } from "react-native-iphone-x-helper"

import { useChat } from "../../../context/ChatContext"
import { useVetCase } from "../../../context/VetCaseContext"
import { useVetCases } from "../../../context/VetCasesContext"
import { useServices } from "../../../context/ServicesContext"
import { MessageMapper } from "../../../infra/mappers/message-mapper"

export const INPUT_AREA_HEIGHT = 58

export const useViewModel = () => {
    const { messageService } = useServices()
    const chatViewModel = useChat()
    const vetCasesViewModel = useVetCases()
    const { id: vetCaseId } = useVetCase().vetCase

    const [inputText, setInputText] = useState("")
    const [isFocused, setInputFocus] = useState(false)
    const [isSendButtonEnabled, makeSendButtonEnabled] = useState(true)

    const isEmptyMessage = !inputText.length

    const onSend = async () => {
        try {
            if (inputText && isSendButtonEnabled) {
                chatViewModel.displaySendFeedback(true)
                makeSendButtonEnabled(false)

                const response = await messageService.create(
                    vetCaseId,
                    { message: inputText }
                )

                await chatViewModel.insertMessage(MessageMapper.apply(response))
                vetCasesViewModel.updateLastMessage(response)
                chatViewModel.scrollToBottom()
            }
        }

        finally {
            makeSendButtonEnabled(true)
            chatViewModel.displaySendFeedback(false)
            setInputText("")
        }
    }

    return {
        onSend,
        isFocused,
        inputText,
        setInputText,
        isEmptyMessage,
        onFocus: () => setInputFocus(true),
        onBlur: () => setInputFocus(false),
    }
}