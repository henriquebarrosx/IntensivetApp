import { SkypeIndicator } from 'react-native-indicators';
import React, { memo, useCallback, useState } from 'react';

import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageProps,
  ImageResizeMode,
} from 'react-native';

interface Props {
  uri: string;
  resizeMode: ImageResizeMode;
}

const FALLBACK_IMAGE = require('../assets/default-fallback-image.png');

// https://github.com/react-native-netinfo/react-native-netinfo

export default memo(({ uri, resizeMode }: Props) => {
  const [closedProgress, setProgress] = useState<boolean>(true);
  const [thumbnail, setResource] = useState<ImageProps | any>({ uri, cache: 'default' });

  const closeProgress = useCallback(() => {
    setProgress(false);
  }, []);

  const onError = useCallback(() => {
    setProgress(false);
    setResource(FALLBACK_IMAGE);
  }, [FALLBACK_IMAGE]);

  return (
    <View style={styles.content}>
      <Image
        onError={onError}
        source={thumbnail}
        style={styles.picture}
        resizeMode={resizeMode}
        onLoadEnd={closeProgress}
        loadingIndicatorSource={thumbnail}
        progressiveRenderingEnabled={true}
      />

      {closedProgress && <SkypeIndicator color="white" style={styles.progress} />}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    flex: 1,
    width: '100%',
    borderRadius: 6,
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
  },
  progress: {
    paddingTop: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
});
