import { useState } from "react"
import { useVetCase } from "../../context/VetCaseContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"
import { localDate } from "../../infra/adapters/local-date-adapter"
import { httpClient } from "../../infra/adapters/http-client-adapter"
import { VetCaseService } from "../../infra/services/vet-case-service"
import { LocalDateFormatEnum } from "../../infra/adapters/local-date-adapter/index.gateway"

export const useViewModel = () => {
    const { vetCase } = useVetCase()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingIndicator] = useState(true)

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            console.log(
                "[VET CASE] GET Requested",
                { endpoint: `/api/v2/vet_cases/${vetCase.id}` }
            )

            const vetCaseService = new VetCaseService(httpClient)
            const response = await vetCaseService.findOne(vetCase.id)

            setVetCaseDetails(response)
        }

        catch (error) {
            console.error(
                "[VET CASE] GET Requested",
                { endpoint: `/api/v2/vet_cases/${vetCase.id}` },
                { error }
            )
        }
    }

    async function handleFetchVetCaseData(): Promise<void> {
        startLoadingEffect()
        await fetchVetCaseDetails()
        stopLoadingEffect()
    }

    function startLoadingEffect(): void {
        shouldDisplayLoadingIndicator(true)
    }

    function stopLoadingEffect(): void {
        shouldDisplayLoadingIndicator(false)
    }

    function getPetIconName(): string {
        return vetCaseDetails?.pet.species === 'Canina' ? 'dog' : 'cat'
    }

    function getPetGender(): string {
        if (vetCaseDetails?.pet.gender) {
            return vetCaseDetails?.pet.gender === 'male' ? 'MACHO' : 'FÊMEA'
        }

        return '---'
    }

    function getPetBirthDate(): string {
        if (vetCaseDetails?.pet.birth_date) {
            return localDate.format(
                vetCaseDetails.pet.birth_date,
                LocalDateFormatEnum.date
            )
        }

        return '---'
    }

    return {
        handleFetchVetCaseData,
        petGender: getPetGender(),
        isLoadingIndicatorDisplayed,
        petIconName: getPetIconName(),
        petBirthDate: getPetBirthDate(),
        petSpecies: vetCaseDetails?.pet.species,
        petName: vetCaseDetails?.pet.name || '---',
        petBreed: vetCaseDetails?.pet.breed || '---',
        petWeight: vetCaseDetails?.pet_anamnesis?.weight,
    }
}