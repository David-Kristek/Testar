import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import {
  activeDate,
  activeSubject,
} from "../../screens/AppTabs/Calendar/CalendarScreen";
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
  const [first, setFirst] = useState(true);
  useEffect(() => {
    setActiveSubject({ title: "", index: -1 });
    setFirst(false);
  }, []);
  if (
    timetable &&
    activeDate.dayInWeek !== -1 &&
    timetable[activeDate.dayInWeek] &&
    timetable[activeDate.dayInWeek].length > 0
  )
    return (
      <Animated.View
        entering={FadeInUp.delay(first ? 500 : 0)}
        exiting={FadeOutUp}
        style={[styles.row, { marginTop: 20, flexWrap: "wrap" }]}
      >
        {timetable[activeDate.dayInWeek].map((item, index) => {
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
      </Animated.View>
    );
  else return <></>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
