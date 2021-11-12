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
        btw && { justifyContent: "space-between" },
      ]}
    >
      {children}
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    flexDirection: "row",
    paddingTop: 50,
    width: "105%",
    height: 95,
    paddingHorizontal: 30,
    shadowColor: "#000",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
  },
});
