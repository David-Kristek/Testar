import React, { useEffect, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  ColorValue,
  Animated,
} from "react-native";

interface Props {
  color: ColorValue;
  type: TaskType;
}

export default function ProgressBadge({ color, type }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Animated.loop(
    //   Animated.spring(animatedValue, {
    //     toValue: 1,
    //     friction: 1,
    //     useNativeDriver: true,
    //   }),
    //   { iterations: 1000 }
    // ).start();
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black ",
        width: 10,
        height: 10,
        borderRadius: 50,
        borderWidth: 2,
        // borderColor: type === "test" ? "black" : "white",
        marginHorizontal: "0.2%",
      }}
    ></View>
  );
}
