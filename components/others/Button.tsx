import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
// @ts-ignore
import { DotsLoader } from 'react-native-indicator';

interface Props {
  text: string;
  onPress?: () => void;
  color?: string;
  loading?: boolean;
}

export default function Button({ text, onPress, color, loading }: Props) {
  return (
    <TouchableOpacity style={styles.buttonBox} onPress={onPress} disabled={loading}>
      {loading ? (
        <DotsLoader size={23} color="white" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: "dodgerblue",
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 17,
  },
});
