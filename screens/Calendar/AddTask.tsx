import React, { useContext, useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text, ScrollView } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { CalendarNavProps } from "./";
import { CalendarContext } from "../../context/CalendarContext";
import ColorPicker from "react-native-wheel-color-picker";
import { AuthContext } from "../../context/Auth/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { NavigationEvents } from "react-navigation";

interface Props {}

export default function AddTask({
  navigation,
  route,
}: CalendarNavProps<"AddTask">) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDUSelected, setIsDUSelected] = useState(true);
  const [isTestSelected, setIsTestSelected] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const { subject, activeDate } = route.params;
  const { addTask, getSubject } = useContext(CalendarContext);
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const onPressHandler = async () => {
    if (!title) return;
    const type = isDUSelected ? "homework" : "test";
    await addTask({
      _id: "",
      title,
      description,
      type,
      date: activeDate,
      subject: {
        title: subject.title,
        index: subject.index,
        color,
      },
      createdByUser: user ?? { username: "", email: "" },
    });
    navigation.navigate("CalendarScreen");
  };
  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      socket?.emit("addingTaskOver", activeDate, user)
    });    
    getSubject(subject.title, activeDate).then((res) => {
      if (res.color) setColor(res.color);
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.badgeCon}>
        <Text style={styles.badge}>{`${activeDate.day}. ${
          activeDate.month + 1
        }.`}</Text>
        <Text style={styles.badge}>{subject.title}</Text>
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
      <Input set={setDescription} placeholder="Popis" />
      <Button text="Potvrdit" onPress={onPressHandler} />
      <View style={{ marginBottom: 20 }}></View>
      <ColorPicker
        // default color
        color={color}
        thumbSize={30}
        sliderSize={0}
        swatches={false}
        onColorChangeComplete={setColor}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: "8%",
  },
  heading: {
    fontSize: 28,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 20,
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
    backgroundColor: "dodgerblue",
    color: "white",
  },
  checkList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
