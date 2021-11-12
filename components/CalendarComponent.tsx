import React, { useMemo, useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Badge from "../components/Badge";
export interface Props {
  month: number;
  year: number;
  id: number;
}
import useCalendarData from "../hooks/useCalendarData";

export default function CalendarComponent({ month, year, id }: Props) {
  const date = new Date();
  const currDate = useMemo(
    () =>
      date.getMonth() === month && date.getFullYear() === year
        ? date.getDate()
        : 0,
    [month, year]
  );
  const [active, setActive] = useState({ month: 0, day: 0 });
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

  useEffect(() => {
    setActive({ month: 0, day: 0 });
  }, []);
  return (
    <>
      {calendarData &&
        calendarData.map((item, index) => (
          <View style={styles.weekCon} key={index}>
            {item.map((item, index) => (
              <View style={[styles.dayCl]} key={index}>
                <View style={styles.badgeBox}>
                  {item.day === 12 && <Badge color="black" />}
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setActive({ ...item });
                  }}
                >
                  <Text
                    style={[
                      styles.calendarDay,
                      item.month != month && styles.ntCrMth,
                      currDate === item.day &&
                        item.month == month &&
                        styles.crDay,
                      active.day === item.day &&
                        active.month == item.month &&
                        styles.active,
                    ]}
                  >
                    {item.day}
                  </Text>
                </TouchableWithoutFeedback>
                <View style={styles.badgeBox}>
                  {item.day === 29 && item.month === month && (
                    <Badge color="blue" />
                  )}
                  {item.day === 12 && <Badge color="red" />}
                  {item.day === 15 && <Badge color="green" />}
                </View>
              </View>
            ))}
          </View>
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  dayCl: {
    width: "16.8%",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
  },
  weekDay: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekDaysCon: {
    paddingTop: 3,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  weekCon: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  calendarDay: {
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 4,
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
    height: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    borderColor: "darkblue",
  },
});
