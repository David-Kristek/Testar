import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/Calendar/CalendarScreen";
import { RootStackParamList } from "../types";
import Login from "../screens/Auth/Login";
import RegisterScreen from "../screens/Auth/Register";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabOneScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
  );
}
