import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Auth from "../screens/Auth";
import Calendar from "../screens/Calendar";
import { AuthContext } from "../context/AuthContext";

export default function Provider() {
  const { user, loading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {loading ? <></> : user ? <Calendar /> : <Auth />}
    </NavigationContainer>
  );
}
