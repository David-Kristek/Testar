import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextComponent,
} from "react-native";
import Color from "color";
interface Props {
  title?: string;
  selected?: boolean;
  onTouch?: (pr: any) => void;
  color?: string;
}

export default function Subject({ title, selected, onTouch, color }: Props) {
  // const textColor = Color(color, "hex").isDark() ? "white" : "white";
  return (
    <TouchableOpacity
      style={[
        styles.box,
        !title && styles.free,
        selected && styles.selection,
        { backgroundColor: color ?? "dodgerblue" },
      ]}
      onPress={onTouch}
    >
      <Text style={{ fontSize: 20,  }}>{title}</Text>
      {/* <Text style={{ fontSize: 20,  color: Color(color).isDark() ? "white" : "white" }}>{title}</Text> */}
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
  },
});
