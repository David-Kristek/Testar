import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import * as React from "react";
import Calendar from "./CalendarScreen";
import AddTask from "./AddTask";

type CalendarStackParamList = {
  CalendarScreen: undefined;
  AddTask: undefined;
};

const Stack = createNativeStackNavigator<CalendarStackParamList>();

export type CalendarNavProps<T extends keyof CalendarStackParamList> = {
  navigation: StackNavigationProp<CalendarStackParamList, T>;
  route: RouteProp<CalendarStackParamList, T>;
};
export default function CalendarApp() {
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
          options={{ title: 'Událost' }}

        />
      </Stack.Navigator>
  );
}
