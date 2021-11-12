import React from "react";
import { TextInput, StyleSheet, View, ColorValue } from "react-native";

interface Props {
  color: ColorValue;
}

export default function Badge({ color }: Props) {
  return (
    <View
      style={{
        backgroundColor: color,
        width: 6,
        height: 6,
        borderRadius: 50,
      }}
    ></View>
  );
}
