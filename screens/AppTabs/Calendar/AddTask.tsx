import React from "react";
import { CalendarNavProps } from ".";
import { useAppDispatch, useAppSelector } from "../../../store";
import { addTask } from "../../../redux/slicers/task";
import TaskForm from "../../../components/moleculs/TaskForm";


interface Props {}
export interface SubmitProps {
  title: string;
  description: string;
  personal: boolean;
  color: string;
  date: DateData
}
export default function AddTask({
  navigation,
  route,
}: CalendarNavProps<"AddTask">) {
  const { subject, activeDate, type } = route.params;
  // const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const onPressHandler = async (pr: SubmitProps) => {
    const { title, description, personal, color, date } = pr;
    if (!title) return;
    dispatch(
      addTask({
        index: {
          _id: "",
          title,
          description,
          type,
          date,
          subject: {
            title: subject.title,
            index: subject.index,
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
      activeDate={activeDate}
      subject={subject}
      onPressHandler={onPressHandler}
    />
  );
}
