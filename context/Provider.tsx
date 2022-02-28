import React from "react";
import { NavigationContainer } from "@react-navigation/native";
//loading animace:   https://reactnative.dev/docs/layoutanimation
import Auth from "../screens/Auth";
import Calendar from "../screens/AppTabs/Calendar";
import { AuthContext } from "./Auth/AuthContext";
import { MenuProvider } from "react-native-popup-menu";
import store, { useAppSelector } from "../store";
import { OfflineActionsResolve } from "../redux/middlewares/OfflineActionMiddleware";
import * as Network from "expo-network";
import AppTabs from "../screens/AppTabs";
export default function Provider() {
  const { logged } = useAppSelector((state) => state.auth);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    const asyncFunc = async () => {
      setTimeout(() => {
        setLoad(true);
      }, 10);
    };
    OfflineActionsResolve(
      store.dispatch,
      store.getState().auth.user?.token ?? ""
    );
    asyncFunc();
  }, [Network]);
  if (!load) return null;
  return (
    <MenuProvider>
      <NavigationContainer>
        {logged ? <AppTabs /> : <Auth />}
      </NavigationContainer>
    </MenuProvider>
  );
}
