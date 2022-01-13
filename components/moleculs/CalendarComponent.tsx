import React, { useMemo, useRef, useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Badge from "../atoms/Badge";

export interface Props {
  month: number;
  year: any;
  id: number;
  active: { month: number; day: number; dayInWeek: number };
  setActive: (param: { month: number; day: number; dayInWeek: number }) => void;
}
import useCalendarData from "../../hooks/useCalendarData";
import { useAppSelector } from "../../store";

export default function CalendarComponent({
  month,
  year,
  id,
  active,
  setActive,
}: Props) {
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

  const animatedValue = useRef(new Animated.Value(0)).current;
  const { tasks } = useAppSelector((state) => state.task);
  useEffect(() => {
    // animatedValue.setValue(0);
    // console.log("happend--+");
    // Animated.timing(animatedValue, {
    //   toValue: 1,
    //   useNativeDriver: false,
    //   duration: 500,
    // }).start();    }
  }, [active]);
  return (
    <>
      {calendarData &&
        calendarData.map((item, index) => (
          <View
            style={[
              styles.weekCon,
              calendarData.length - 2 < index && { borderBottomWidth: 0 },
            ]}
            key={index}
          >
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
                <Animated.View
                  style={[
                    styles.dayCl,
                    currDate === item.day &&
                      item.month == month &&
                      styles.crDay,
                    active.day === item.day &&
                      active.month == item.month && [
                        styles.active,
                        {
                          // backgroundColor: animatedValue.interpolate({
                          //   inputRange: [0, 1],
                          //   outputRange: [
                          //     "rgba(255, 255, 255, 1)",
                          //     "rgba(30, 144, 255, 1)",
                          //   ],
                          // }),
                          // opacity: animatedValue,
                        },
                      ],
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
                    {id === 1 &&
                      tasks &&
                      tasks.map((task, index) => {
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
                </Animated.View>
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
    width: "20%",
    borderWidth: 2,
    borderColor: "transparent",
    paddingTop: 11,
    borderRadius: 50,
  },
  weekCon: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    // borderWidth: 2,
    // marginVertical: 4,
    paddingVertical: 2,
    borderRadius: 5,
    borderColor: "dodgerblue",
    borderBottomWidth: 2,
  },
  calendarDay: {
    color: "black",
    fontSize: 17,
  },
  ntCrMth: {
    color: "grey",
  },
  crDay: {
    borderColor: "dodgerblue",
    backgroundColor: "dodgerblue",
    color: "white",
    borderWidth: 2,
  },
  badgeBox: {
    flexDirection: "row",
    height: 11,
    width: "100%",
    // alignItems: "baseline",
    justifyContent: "center",
  },
  active: {
    // borderColor: "white",
    backgroundColor: "#00eae9",
  },
  line: {
    backgroundColor: "dodgerblue",
    width: "100%",
    height: 1.6,
  },
});
