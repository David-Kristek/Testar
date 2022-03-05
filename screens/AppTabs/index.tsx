import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";
import Icona from "react-native-vector-icons/FontAwesome5";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Calendar from "./Calendar";
import Tasks from "./Tasks";
type CalendarStackParamList = {
  calendar: undefined;
  tasks: undefined;
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

          if (route.name === "calendar") {
            iconName = "home";
            return <Icon name={"calendar"} size={size} color={color} />;
          } else if (route.name === "tasks") {
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
        name="calendar"
        component={Calendar}
        options={{ headerShown: false, title: "Kalendář"}}
      />
      <Tabs.Screen name="tasks" component={Tasks} options={{ title: "Seznam" }} />
    </Tabs.Navigator>
  );
}
export default AppTabs;
