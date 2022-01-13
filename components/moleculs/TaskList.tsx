import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { activeDate } from "../../screens/Calendar/CalendarScreen";
import { useAppSelector } from "../../store";
import Task from "../atoms/Task";

interface Props {
  activeDate: activeDate;
}

export default function TaskList({ activeDate }: Props) {
  const { tasks } = useAppSelector((state) => state.task);
  if (!tasks) return <></>;
  return (
    <>
      {tasks.map((task, index) => {        
        if (
          task && task.date &&
          task.date.day === activeDate.day &&
          task.date.month === activeDate.month
          //  && task.date.year === year
        ) {
          if (task.type !== "progress")
            return (
              <Task
                title={task.title}
                subject={task.subject.title}
                color={task.subject.color}
                description={task.description}
                key={index}
                id={task._id}
              />
            );
        }
      })}
    </>
  );
}

const styles = StyleSheet.create({});
