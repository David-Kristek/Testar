import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useAppSelector } from "../../store";
import Badge from "./Badge";

interface Props {
  active: { month: number; day: number; dayInWeek: number };
  setActive: (param: { month: number; day: number; dayInWeek: number }) => void;
  item: {
    month: number;
    day: number;
  };
  currDate: number;
  month: number;
  index: number;
  id: number;
  year: number;
}

export default function CalendarDay({
  active,
  setActive,
  item,
  currDate,
  month,
  index,
  id,
  year,
}: Props) {
  const { tasks } = useAppSelector((state) => state.task);
  const sharedVal = useSharedValue("#ECECEC");

  const isActive = useMemo(
    () => active.day === item.day && active.month === item.month,
    [active, item]
  );
  const isCurrent = useMemo(
    () => currDate === item.day && item.month == month,
    [currDate, item]
  );
  const animatedStyles = useAnimatedStyle(() => {
    return {
      // not working withSpring
      //   backgroundColor: withSpring(sharedVal.value, {velocity: 2}),
      backgroundColor: sharedVal.value,
    };
  });
  React.useEffect(() => {
    sharedVal.value = "#ECECEC";
    if (isActive) {
      sharedVal.value = "#00EAE9";
      console.log("setting to one");
    }
  }, [active]);
  return (
    <TouchableOpacity
      onPress={() => {
        if (isActive) {
          setActive({ month: 0, day: 0, dayInWeek: -1 });
          //   ? "#00eae9"
          //   : isCurrent
          //   ? "dodgerblue"
          return;
        }
        setActive({
          month: item.month,
          day: item.day,
          dayInWeek: index,
        });
      }}
      key={index}
      style={{ width: "20%" }}
    >
      <Animated.View
        style={[
          animatedStyles,
          styles.dayCl,
          isCurrent && styles.crDay,
          isActive && styles.active,
        ]}
      >
        <Text
          style={[styles.calendarDay, item.month != month && styles.ntCrMth]}
        >
          {item.day}
        </Text>

        <View style={styles.badgeBox}>
          {id === 1 &&
            tasks &&
            tasks.map((task, index) => {
              if (
                task.date.day === item.day &&
                task.date.month === item.month &&
                task.date.year === year
              ) {
                return (
                  <Badge
                    color={task.subject.color}
                    type={task.type}
                    key={index}
                  />
                );
              }
            })}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dayCl: {
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: "transparent",
    paddingTop: 11,
    borderRadius: 50,
  },
  calendarDay: {
    color: "black",
    fontSize: 17,
  },
  ntCrMth: {
    color: "grey",
  },
  crDay: {
    borderColor: "dodgerblue",
    // backgroundColor: "dodgerblue",
    color: "white",
    borderWidth: 2,
  },
  badgeBox: {
    flexDirection: "row",
    height: 11,
    width: "100%",
    // alignItems: "baseline",
    justifyContent: "center",
  },
  active: {
    // borderColor: "white",
    backgroundColor: "#00eae9",
  },
  line: {
    backgroundColor: "dodgerblue",
    width: "100%",
    height: 1.6,
  },
});
