import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Auth from "../screens/Auth";
import Calendar from "../screens/Calendar";
import { AuthContext } from "./Auth/AuthContext";
import { MenuProvider } from "react-native-popup-menu";
import { useAppSelector } from "../store";
export default function Provider() {
  const { logged } = useAppSelector((state) => state.auth);

  return (
      <MenuProvider>
        <NavigationContainer>
          {logged ? <Calendar /> : <Auth />}
        </NavigationContainer>
      </MenuProvider>
  );
}
