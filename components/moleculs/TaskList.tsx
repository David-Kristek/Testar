import React from "react";
import { StyleSheet, View, Text, FlatList, ListRenderItem } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import { activeDate } from "../../screens/AppTabs/Calendar/CalendarScreen";
import { useAppSelector } from "../../store";
import Task from "../atoms/Task";

interface Props {
  activeDate: activeDate;
}

export default function TaskList({ activeDate }: Props) {
  const { tasks } = useAppSelector((state) => state.task);
  if (!tasks) return <></>;
  var order = 0;
  return (
    <View style={{ position: "relative", zIndex: -1000}}>
      {tasks.map((task, index) => {
        if (
          task &&
          task.date &&
          task.date.day === activeDate.day &&
          task.date.month === activeDate.month
          //  && task.date.year === year
        ) {
          if (task.type !== "progress") order++;
          return (
            <Task
              index={order - 1}
              taskData={task}
              key={index}
            />
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
