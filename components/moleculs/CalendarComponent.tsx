import React, { useMemo, useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

export interface Props {
  month: number;
  year: any;
  id: number;
  active: { month: number; day: number; dayInWeek: number };
  setActive: (param: { month: number; day: number; dayInWeek: number }) => void;
}
import useCalendarData from "../../hooks/useCalendarData";
import CalendarDay from "../atoms/CalendarDay";

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
  const { calendarData } = useCalendarData(
    numberOfShownYear,
    numberOfShownMonth
  );
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
              <CalendarDay
                active={active}
                setActive={setActive}
                item={item}
                currDate={currDate}
                month={month}
                year={year}
                index={index}
                id={id}
                key={index}
              />
            ))}
          </View>
        ))}
    </>
  );
}

const styles = StyleSheet.create({
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
});
