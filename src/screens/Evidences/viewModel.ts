import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { API } from "../../services/axios";
import { useVetCase } from "../../context/VetCaseContext";
import { EvidencesType } from "../../schemas/VetCaseDetails";

export const useViewModel = () => {
  const { vetCase } = useVetCase();
  const navigation = useNavigation();

  const [evidences, setEvidences] = useState<EvidencesType[]>([]);
  const [isFetchingEvidences, displayFetchFeedback] = useState<boolean>(true);

  async function fetchVetCaseDetails(): Promise<void> {
    displayFetchFeedback(true);

    const { data } = await API.get(`/api/v2/vet_cases/${vetCase.id}`);
    setEvidences([...data?.chat_evidences, ...data?.evidences]);

    displayFetchFeedback(false);
  }

  function openEvidenceFile(source: string): void {
    navigation.navigate('WebPage', { screenTitle: 'Evidências', source: source });
  }

  function isEvidencesNotFoundTextVisible(): boolean {
    return evidences.length === 0 && !isFetchingEvidences;
  }

  function getEvidenceIcon({ type }: { type: string }): string {
    if (type.endsWith('pdf')) {
      return 'file-pdf-box';
    }

    if (type.endsWith('csv') || type.endsWith('xlsx')) {
      return 'file-excel';
    }

    if (type.endsWith('docx')) {
      return 'word';
    }

    if (type.endsWith('mp3')) {
      return 'music'
    }

    if (type.startsWith('video')) {
      return 'video'
    }

    if (type.startsWith('image')) {
      return 'image'
    }

    return 'file'
  }

  return {
    evidences,
    getEvidenceIcon,
    openEvidenceFile,
    fetchVetCaseDetails,
    isFetchingEvidences,
    isEvidencesNotFoundTextVisible: isEvidencesNotFoundTextVisible(),
  }
}