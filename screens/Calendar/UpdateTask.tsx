import React from "react";
import { CalendarNavProps } from "./";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateTask } from "../../redux/slicers/task";
import TaskForm from "../../components/moleculs/TaskForm";

interface Props {}
export interface SubmitProps {
  title: string;
  description: string;
  personal: boolean;
  color: string;
  date: DateData; 
}
export default function UpdateTask({
  navigation,
  route,
}: CalendarNavProps<"UpdateTask">) {
  const task : Task = route.params;
  // const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const onPressHandler = async (pr: SubmitProps) => {
    const { title, description, personal, color, date } = pr;
    if (!title) return;
    dispatch(
      updateTask({
        index: {
          _id: task._id,
          title,
          description,
          type: task.type,
          // uprava data se v budoucnu zmeni
          date,
          subject: {
            title: task.subject.title,
            color,
          },
          personal,
          createdByUser: user ?? { username: "", email: "" },
        },
      })
    );

    navigation.navigate("CalendarScreen");
  };

  return (
    <TaskForm
      activeDate={task.date}
      subject={task.subject}
      onPressHandler={onPressHandler}
      defaultProps={task}
    />
  );
}
