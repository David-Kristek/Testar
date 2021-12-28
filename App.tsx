import React from "react";
import { Text } from "react-native";
import Provider from "./context/Provider";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Provider />
    </ReduxProvider>
  );
}
