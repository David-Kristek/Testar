import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";
import Icona from "react-native-vector-icons/FontAwesome5";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Calendar from "./Calendar";
import Tasks from "./Tasks";
type CalendarStackParamList = {
  CalendarScreen: undefined;
  TasksScreen: undefined;
};

const Stack = createBottomTabNavigator<CalendarStackParamList>();

export type CalendarNavProps<T extends keyof CalendarStackParamList> = {
  navigation: StackNavigationProp<CalendarStackParamList, T>;
  route: RouteProp<CalendarStackParamList, T>;
};
const Tabs = createBottomTabNavigator<CalendarStackParamList>();

function AppTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "CalendarScreen") {
            iconName = "home";
            return <Icon name={"calendar"} size={size} color={color} />;
          } else if (route.name === "TasksScreen") {
            return <Icona name={"tasks"} size={size} color={color} />;
          }

          // // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      //   tabBarOptions={{
      //     activeTintColor: "dodgerblue",
      //     inactiveTintColor: "gray",
      //   }}
    >
      <Tabs.Screen
        name="CalendarScreen"
        component={Calendar}
        options={{ headerShown: false, title: "Kalendář"}}
      />
      <Tabs.Screen name="TasksScreen" component={Tasks} options={{ title: "Seznam" }} />
    </Tabs.Navigator>
  );
}
export default AppTabs;
