import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import ColorPicker from "react-native-wheel-color-picker";
import DatePicker from "react-native-date-picker";
import { SubmitProps } from "../../screens/AppTabs/Calendar/AddTask";
import { useGetSubjectColorQuery } from "../../services/task";
import Button from "../others/Button";
import Input from "../others/Input";

interface Props {
  activeDate: DateData;
  subject: { index?: number; title: string };
  onPressHandler: (pr: SubmitProps) => Promise<any>;
  defaultProps?: Task;
}

export default function TaskForm({
  activeDate,
  subject,
  onPressHandler,
  defaultProps,
}: Props) {
  const [title, setTitle] = useState(defaultProps?.title ?? "");
  const [description, setDescription] = useState(
    defaultProps?.description ?? ""
  );
  const [personal, setPersonal] = useState(defaultProps?.personal ?? false);
  const [day, setDay] = useState(String(activeDate.day));
  const [month, setMonth] = useState(String(activeDate.month + 1));
  const [year, setYear] = useState(String(activeDate.year));
  const [color, setColor] = useState("#FFFFFF");
  const [date, setDate] = useState(
    new Date(activeDate.year, activeDate.month, activeDate.day)
  );
  const { data, isLoading, currentData } = useGetSubjectColorQuery(
    subject.title
  );
  useEffect(() => {
    if (data) {
      setColor(data.color);
    }
  }, [isLoading]);
  const onSubmit = () => {
    const dateProper: DateData = {
      year: Number(year),
      month: Number(month) - 1,
      day: Number(day),
    };
    onPressHandler({ title, description, personal, color, date: dateProper });
  };
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.badge}>{`${activeDate.day}. ${
          activeDate.month + 1
        }.`}</Text> */}

      <Text style={styles.heading}>Přidat událost</Text>
      <View style={styles.badgeCon}>
        <Text style={styles.badge}>{subject.title}</Text>
      </View>
      <View style={styles.dateInputs}>
        <View>
          <Text style={styles.sb}>Den</Text>
          <Input
            set={setDay}
            placeholder="Název"
            value={day}
            noMargin
            numbers
          />
        </View>
        <View>
          <Text style={styles.sb}>Měsíc</Text>
          <Input
            set={setMonth}
            placeholder="Název"
            value={month}
            noMargin
            numbers
          />
        </View>
        <View>
          <Text style={styles.sb}>Rok</Text>
          <Input
            set={setYear}
            placeholder="Název"
            value={year}
            noMargin
            numbers
          />
        </View>
      </View>

      {/* <DatePicker date={date} onDateChange={setDate} mode="datetime" /> */}
      <Input set={setTitle} placeholder="Název" value={title} />
      <Input set={setDescription} placeholder="Popis" value={description} />
      <View style={styles.checkList}>
        <View style={styles.checkBoxCon}>
          <Checkbox
            value={!personal}
            onValueChange={(value) => {
              setPersonal(!value);
            }}
          />
          <Text> Pro všechny</Text>
        </View>
        <View style={styles.checkBoxCon}>
          <Checkbox
            value={personal}
            onValueChange={(value) => {
              setPersonal(value);
            }}
          />
          <Text> Osobní</Text>
        </View>
      </View>
      <Button text="Potvrdit" onPress={onSubmit} />
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
    // textAlign: "center",
    marginVertical: 30,
    paddingLeft: 6,
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
    backgroundColor: "dodgerblue",
    color: "white",
  },
  checkList: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10
  },
  heading2: {
    fontSize: 18,
    paddingLeft: 6,
  },
  dateInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 10,
  },
  sb: {
    paddingBottom: 2,
    color: "grey",
  },
});
