import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Task from "../../../components/atoms/Task";
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
  return (
    <ScrollView>
      {currentTasks &&
        currentTasks.map((task, index) => (
          <>
          <Text>{task.date.day}. {task.date.month + 1}.</Text>
            <Task index={1} taskData={task} key={index} />
          </>
        ))}
    </ScrollView>
  );
}
