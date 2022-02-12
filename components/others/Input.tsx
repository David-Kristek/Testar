import React, { useState, useRef, useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder: string;
  set: (st: string) => void;
  value?: string | number;
  noMargin?: boolean;
  numbers?: boolean
}

export default function Input({ placeholder, set, value, noMargin, numbers }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      placeholder={placeholder}
      style={[
        styles.TextInput,
        {
          borderColor: focused ? "dodgerblue" : "#51a9ff",
          borderWidth: focused ? 2 : 1,
          marginVertical: noMargin ? 0 : 10,
        },
      ]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChangeText={set}
      value={value ? String(value) : undefined}
      keyboardType={numbers ? "numeric" : "default"}
    />
  );
}

const styles = StyleSheet.create({
  TextInput: {
    height: 43,
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
});
