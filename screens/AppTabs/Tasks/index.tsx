import React, { useMemo } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Animated, {
  FadeInDown,
  Layout,
  Easing,
  SlideOutLeft,
} from "react-native-reanimated";
import Task from "../../../components/atoms/Task";
import {
  dateEquals,
  getNumberOfWeek,
  getWeekDay,
  weekDay,
} from "../../../hooks/useCalendarData";
import { useAppSelector } from "../../../store";
export default function Tasks() {
  const { tasks } = useAppSelector((state) => state.task);
  const cD = new Date();
  const compareDate = (a: DateData, b: DateData) => {
    if (
      a.year < b.year ||
      (a.year === b.year &&
        (a.month < b.month || (a.month === b.month && a.day < b.day)))
    ) {
      return false;
    }
    return true;
  };
  const currentTasks: Task[] | null = useMemo(() => {
    if (!tasks) return null;
    const filtredTasks = tasks.filter((task) => {
      return compareDate(task.date, {
        day: cD.getDate(),
        month: cD.getMonth(),
        year: cD.getFullYear(),
      });
    });
    return filtredTasks.sort((a, b) => (compareDate(a.date, b.date) ? 1 : -1));
  }, [tasks]);
  const defaultDate = {
    day: cD.getDate(),
    month: cD.getMonth(),
    year: cD.getFullYear(),
  };
  var prevDate: DateData = defaultDate;
  //  otázka prevWeeku
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      {currentTasks &&
        currentTasks.map((task, index) => {
          // completely new list
          // <View style={{ width: "90%" }}>
          // <Text>{task.date.day}. {task.date.month + 1}.</Text>
          //   <Task index={1} taskData={task} key={index} />
          // </View
          {
            /* {getNumberOfWeek(task.date) > getNumberOfWeek(task.date) ? (
                <View style={styles.line}></View>
              ) : (
                <></>
              )} */
          }

          const jsx = (
            <View key={index} style={{ width: "90%" }}>
              {dateEquals(prevDate, task.date) ? (
                <></>
              ) : (
                <Text style={styles.date}>
                  {task.date.day}. {task.date.month + 1}.{"  "}
                  {weekDay(task.date).title}
                </Text>
              )}
              <Animated.View
                style={[styles.box, { backgroundColor: task.subject.color }]}
                entering={FadeInDown.delay(index * 100)}
                layout={Layout.easing(Easing.bounce)}
                exiting={SlideOutLeft}
              >
                <View>
                  <Text style={styles.title}>{task.title}</Text>
                  {task.description ? (
                    <Text style={styles.desc}>{task.description}</Text>
                  ) : (
                    <></>
                  )}
                </View>
                <Text style={styles.subject}>{task.subject.title}</Text>
              </Animated.View>
            </View>
          );
          prevDate = task.date;
          return jsx;
        })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  box: {
    opacity: 0.9,
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 15,
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "black",
    borderRadius: 10,

    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    // color: "#242424",
    color: "black",
  },
  desc: {
    fontSize: 14,
    color: "#242424",
    paddingTop: 5,
  },
  date: {
    fontSize: 16,
    width: "80%",
    paddingTop: 20,
  },
  subject: {
    fontSize: 12,
    padding: 6,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "black",
    borderRadius: 8,
    marginRight: 10,
    marginVertical: 2,
  },
  line: {
    width: "100%",
    backgroundColor: "dodgerblue",
    height: 3,
  },
});
