import React from "react";
import { TextInput, StyleSheet, View, ColorValue } from "react-native";

interface Props {
  color: ColorValue;
  type: "homework" | "test";
}

export default function Badge({ color, type }: Props) {
  return (
    <View
      style={{
        backgroundColor: color,
        width: 10,
        height: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: type === "test" ? "black" : "white",
      }}
    ></View>
  );
}
