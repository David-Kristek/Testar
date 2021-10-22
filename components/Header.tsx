import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface Props {
  children?: React.ReactNode;
  btw?: boolean;
}

export default function Header({ children, btw }: Props) {
  return (
    <View
      style={[
        style.box,
        btw && { justifyContent: "space-between", flexDirection: "row" },
      ]}
    >
      {children}
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    paddingTop: 50,
    width: "105%",
    height: 100,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginLeft: -6,
    elevation: 8,
  },
});
