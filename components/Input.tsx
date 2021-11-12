import React, { useState, useRef, useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder: string;
  set: (st: string) => void;
}

export default function Input({ placeholder, set }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      placeholder={placeholder}
      style={[
        styles.TextInput,
        {
          borderColor: focused ? "dodgerblue" : "#51a9ff",
          borderWidth: focused ? 2 : 1,
        },
      ]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChangeText={set}
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
    marginVertical: 10,
  },
});
