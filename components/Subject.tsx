import React from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface Props {
  title?: string;
  selected?: boolean;
}

export default function Subject({ title, selected }: Props) {
  return (
    <TouchableOpacity style={[styles.box, !title && styles.free, selected && styles.selection]}>
      <Text style={{ fontSize: 20, color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  box: {
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#00A2E2",
    paddingVertical: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
  free: {
    width: 45,
    backgroundColor: "white",
    borderColor: "#00A2E2",
  },
  selection: {
    borderColor: "black",
  }
});
