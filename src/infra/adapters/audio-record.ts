import { Audio } from "expo-av"
import { Alert } from "react-native"
import { DeviceFile } from "../../domain/entities/device-file"

export class AudioRecordAdapter {
    data: Audio.Recording

    async requestAsyncPermission(): Promise<boolean> {
        console.log("[MICROPHONE] Permission requested")
        const currentPermission = await Audio.getPermissionsAsync()

        if (currentPermission.granted) return true

        console.log("[MICROPHONE] Permission requested")
        const permissionResult = await Audio.requestPermissionsAsync()
        return permissionResult.granted;
    }

    async start(): Promise<AudioRecordAdapter> {
        const hasGalleryAccessPermission = await this.requestAsyncPermission()

        if (!hasGalleryAccessPermission) {
            Alert.alert("Permissão necessária", "Para realizar a gravação e envio de áudios, é necessário acesso ao microfone do dispositivo")
            return
        }

        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
        this.data = recording
        return this
    }

    async stop(): Promise<DeviceFile> {
        this.data.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })

        const uri = this.data.getURI()
        return DeviceFile.create({ uri, type: "audio" })
    }

    async cancel(): Promise<void> {
        this.data.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
    }
}