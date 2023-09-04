import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'center',
    width: Dimensions.get('screen').width / 4.5,
  },
  button: {
    padding: 12,
    marginBottom: 5,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#07a0e9',
  },
  absoluteFill: {
    width: 500,
    height: 600,
    position: 'absolute',
  }
});
