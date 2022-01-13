import React from "react";
import { Text } from "react-native";
import Provider from "./context/Provider";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider />
      </PersistGate>
    </ReduxProvider>
  );
}
