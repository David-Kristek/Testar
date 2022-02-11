import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  navigateToAddTask: (task: TaskType) => void;
  visble?: boolean;
}

export default function FloatingButton({ navigateToAddTask, visble }: Props) {
  const actions: IActionProps[] = [
    {
      text: "DÚ",
      icon: MyIcon("home"),
      name: "homework",
      color: "dodgerblue",
    },
    {
      text: "Test",
      icon: MyIcon("school"),
      name: "test",
      color: "dodgerblue",
    },
  ];
  return (
    <FloatingAction
      actions={actions}
      onPressItem={(name) => {
        if (name === "homework" || name === "test") {
          var title: TaskType = name!;
          navigateToAddTask(title);
        }
      }}
      color="dodgerblue"
      visible={visble}
      
    />
  );
}
const MyIcon = (title: string) => <Icon name={title} size={20} color="white" />;

const styles = StyleSheet.create({});
