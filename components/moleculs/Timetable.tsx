import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  activeDate,
  activeSubject,
} from "../../screens/Calendar/CalendarScreen";
import { useGetTimeTableDataQuery } from "../../services/task";
import { useAppSelector } from "../../store";
import Subject from "../atoms/Subject";

interface Props {
  setActiveSubject: (param: activeSubject) => void;
  activeSubject: activeSubject;
  activeDate: activeDate;
}

export default function TimeTable({
  setActiveSubject,
  activeSubject,
  activeDate,
}: Props) {
  const a = useGetTimeTableDataQuery();
  const { timetable } = useAppSelector((state) => state.task);
  useEffect(() => {
    setActiveSubject({ title: "", index: -1 });
  }, []);
  return (
    <View style={[styles.row, { marginTop: 20, flexWrap: "wrap" }]}>
      {timetable &&
        activeDate.dayInWeek !== -1 &&
        timetable[activeDate.dayInWeek] &&
        timetable[activeDate.dayInWeek].length > 0 &&
        timetable[activeDate.dayInWeek].map((item, index) => {
          const onPressHandler = () => {
            setActiveSubject({ index, title: item.subject.Name });
          };
          // const color = tasksData?.filter(item => item.subject.)
          return (
            <Subject
              title={item.subject.Abbrev}
              selected={index === activeSubject.index}
              onTouch={onPressHandler}
              Room={item.room}
              key={index}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
