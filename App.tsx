import React from "react";
import { Text } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import Provider from "./context/Provider";

export default function App() {
  return (
    <AuthProvider>
      <Provider />
    </AuthProvider>
  );
}
