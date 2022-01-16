import React, { useContext, useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text, ScrollView } from "react-native";
import Button from "../../components/others/Button";
import Input from "../../components/others/Input";
import { CalendarNavProps } from "./";
import ColorPicker from "react-native-wheel-color-picker";
import { AuthContext } from "../../context/Auth/AuthContext";
// import { SocketContext } from "../../context/SocketContext";
import { NavigationEvents } from "react-navigation";
import { useAppDispatch, useAppSelector } from "../../store";
import { useGetSubjectColorQuery } from "../../services/task";
import { addTask } from "../../redux/slicers/task";

interface Props {}

export default function AddTask({
  navigation,
  route,
}: CalendarNavProps<"AddTask">) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDUSelected, setIsDUSelected] = useState(true);
  const [color, setColor] = useState("#FFFFFF");
  const { subject, activeDate } = route.params;
  // const { socket } = useContext(SocketContext);
  const { data, isLoading, currentData } = useGetSubjectColorQuery(
    subject.title
  );
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const onPressHandler = async () => {
    if (!title) return;
    const type = isDUSelected ? "homework" : "test";
    dispatch(
      addTask({
        index: {
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
        },
      })
    );

    navigation.navigate("CalendarScreen");
  };
  useEffect(() => {
    if (data) {
      setColor(data.color);
    }
  }, [isLoading]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.badgeCon}>
        <Text style={styles.badge}>{`${activeDate.day}. ${
          activeDate.month + 1
        }.`}</Text>
        <Text style={styles.badge}>{subject.title}</Text>
      </View>
      <Text style={styles.heading}>Přidat událost</Text>
      {/* <View style={styles.checkList}>
        <View style={styles.checkBoxCon}>
          <CheckBox
            value={isDUSelected}
            onValueChange={(value) => {
              setIsDUSelected(value);
            }}
          />
          <Text>Domácí úkol</Text>
        </View>
        <View style={styles.checkBoxCon}>
          <CheckBox
            value={!isDUSelected}
            onValueChange={(value) => {
              setIsDUSelected(!value);
            }}
          />
          <Text>Test</Text>
        </View>
      </View> */}
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
