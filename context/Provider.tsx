import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Auth from "../screens/Auth";
import Calendar from "../screens/Calendar";
import { AuthContext } from "../context/AuthContext";
import { MenuProvider } from "react-native-popup-menu";

export default function Provider() {
  const { user, loading } = useContext(AuthContext);

  return (
    <MenuProvider>
      <NavigationContainer>
        {loading ? <></> : user ? <Calendar /> : <Auth />}
      </NavigationContainer>
    </MenuProvider>
  );
}
