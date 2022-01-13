import React from "react";
import {View, ColorValue} from "react-native";
import ProgressBadge from "./ProgressBadge";

interface Props {
  color: ColorValue;
  type: TaskType;
}

export default function Badge({ color, type }: Props) {
  if (type === "progress") {
    return <ProgressBadge color={color} type={type} />
  } else
    return (
      <View
        style={{
          backgroundColor: color,
          width: 10,
          height: 10,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: type === "test" ? "black" : "white",
          marginHorizontal: "0.2%",
        }}
      ></View>
    );
}
