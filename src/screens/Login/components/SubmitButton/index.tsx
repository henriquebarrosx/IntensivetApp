import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import { LoadingIndicator } from '../../../../components/LoadingIndicator';

interface Props {
  onPress: () => void;
  isLoadingEffectVisible: boolean;
}

export const SubmitButton = ({ onPress, isLoadingEffectVisible }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonArea}>
      <LoadingIndicator isLoading={isLoadingEffectVisible} />
      {!isLoadingEffectVisible && <Text style={styles.buttonText}>Acessar</Text>}
    </TouchableOpacity>
  )
}