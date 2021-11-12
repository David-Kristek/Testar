import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface Props {
  title: string;
  subject: string;
  color: string;
  description?: string;
}

export default function Task({ title, subject, color, description }: Props) {
  return (
    <View style={{ marginVertical: 20 }}>
      <View style={styles.box}>
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <Text style={{ fontSize: 16 }}>{subject}</Text>
      </View>
      {description && (
        <Text style={{ fontSize: 14, paddingBottom: 5 }}>{description}</Text>
      )}
      <View style={[styles.underline, { backgroundColor: color }]}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 5,
  },
  underline: {
    width: "100%",
    height: 3,
  },
});
