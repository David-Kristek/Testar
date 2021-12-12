import React, { useMemo, useRef, useEffect, useContext } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Badge from "../components/Badge";
import { CalendarContext } from "../context/CalendarContext";

export interface Props {
  month: number;
  year: any;
  id: number;
  active: { month: number; day: number; dayInWeek: number };
  setActive: (param: { month: number; day: number; dayInWeek: number }) => void;
}
import useCalendarData from "../hooks/useCalendarData";

export default function CalendarComponent({
  month,
  year,
  id,
  active,
  setActive,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const date = new Date();
  const currDate = useMemo(
    () =>
      date.getMonth() === month && date.getFullYear() === year
        ? date.getDate()
        : 0,
    [month, year]
  );

  const nextMonthNumber = month === 11 ? 0 : month + 1;
  const prevMonthNumber = month === 0 ? 11 : month - 1;
  const numberOfShownMonth =
    id === 0 ? prevMonthNumber : id === 2 ? nextMonthNumber : month;
  const numberOfShownYear =
    id === 0 && month === 0
      ? year - 1
      : id === 2 && month === 11
      ? year + 1
      : year;
  const { data, calendarData } = useCalendarData(
    numberOfShownYear,
    numberOfShownMonth
  );

  const { tasksData } = useContext(CalendarContext);
  return (
    <>
      {calendarData &&
        calendarData.map((item, index) => (
          <View style={styles.weekCon} key={index}>
            {item.map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (active.day === item.day && active.month === item.month) {
                    setActive({ month: 0, day: 0, dayInWeek: -1 });
                    return;
                  }
                  setActive({
                    month: item.month,
                    day: item.day,
                    dayInWeek: index,
                  });
                }}
                key={index}
              >
                <View
                  style={[
                    styles.dayCl,
                    currDate === item.day &&
                      item.month == month &&
                      styles.crDay,
                    active.day === item.day &&
                      active.month == item.month && { ...styles.active },
                    { width: "20%" },
                  ]}
                >
                  <Text
                    style={[
                      styles.calendarDay,
                      item.month != month && styles.ntCrMth,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <View style={styles.badgeBox}>
                    {tasksData &&
                      tasksData.map((task, index) => {
                        if (
                          task.date.day === item.day &&
                          task.date.month === item.month &&
                          task.date.year === year
                        ) {
                          return (
                            <Badge
                              color={task.subject.color}
                              type={task.type}
                              key={index}
                            />
                          );
                        }
                      })}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  dayCl: {
    alignItems: "center",
    // borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    paddingTop: 11,
  },
  weekCon: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    borderWidth: 2,
    marginVertical: 4,
    borderRadius: 5,
    borderColor: "dodgerblue",
  },
  calendarDay: {
    color: "black",
    fontSize: 16,
  },
  ntCrMth: {
    color: "grey",
  },
  crDay: {
    borderColor: "dodgerblue",
    backgroundColor: "dodgerblue",
    color: "white",
  },
  badgeBox: {
    flexDirection: "row",
    height: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    // borderColor: "darkblue",
    backgroundColor: "#00eae9",
  },
});
