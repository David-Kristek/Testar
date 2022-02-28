import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import * as React from "react";
import Calendar from "./CalendarScreen";
import AddTask from "./AddTask";
// import SocketProvider from "../../context/SocketContext";
import useSocket from "../../../hooks/useSocket";
import UpdateTask from "./UpdateTask";


type CalendarStackParamList = {
  CalendarScreen: undefined;
  AddTask: {
    subject: { index: number; title: string };
    activeDate: DateData;
    type: TaskType;
  };
  UpdateTask: Task;
};

const Stack = createStackNavigator<CalendarStackParamList>();

export type CalendarNavProps<T extends keyof CalendarStackParamList> = {
  navigation: StackNavigationProp<CalendarStackParamList, T>;
  route: RouteProp<CalendarStackParamList, T>;
};
export default function CalendarApp() {
  useSocket();
  return (
    <Stack.Navigator
    //   https://reactnavigation.org/docs/modal/#summary
    >
      <Stack.Screen
        name="CalendarScreen"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{
          title: "Událost",
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        initialParams={{
          subject: { title: "", index: 0 },
          activeDate: { day: 0, month: 0, year: 2021 },
        }}
      />
      <Stack.Screen
        name="UpdateTask"
        component={UpdateTask}
        options={{
          title: "Událost",
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
}
