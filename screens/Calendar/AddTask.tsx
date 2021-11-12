import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { CalendarNavProps } from "./";

interface Props {}

export default function AddTask({ navigation }: CalendarNavProps<"AddTask">) {
  const [title, setTitle] = useState("");
  const [descryption, setDescryption] = useState("");
  const [isDUSelected, setIsDUSelected] = useState(true);
  const [isTestSelected, setIsTestSelected] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.badgeCon}>
        <Text style={styles.badge}>29.5.</Text>
        <Text style={styles.badge}>Dějepis</Text>
      </View>
      <Text style={styles.heading}>Přidat událost</Text>
      <View style={styles.checkList}>
        <View style={styles.checkBoxCon}>
          <CheckBox
            value={isDUSelected}
            onValueChange={(value) => {
              setIsTestSelected(!value);
              setIsDUSelected(value);
            }}
          />
          <Text>Domácí úkol</Text>
        </View>
        <View style={styles.checkBoxCon}>
          <CheckBox
            value={isTestSelected}
            onValueChange={(value) => {
              setIsDUSelected(!value);
              setIsTestSelected(value);
            }}
          />
          <Text>Test</Text>
        </View>
      </View>
      <Input set={setTitle} placeholder="Název" />
      <Input set={setDescryption} placeholder="Popis" />
      <Button text="Potvrdit" onPress={() => navigation.navigate("Calendar")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: "8%",
  },
  heading: {
    fontSize: 22,
    textAlign: "center",
    paddingBottom: 15,
  },
  checkBoxCon: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeCon: {
    flexDirection: "row",
  },
  badge: {
    fontSize: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 5,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "darkblue",
    color: "white",
  },
  checkList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
