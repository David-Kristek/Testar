import React, { useState, useEffect, useReducer  } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useNetInfo } from "@react-native-community/netinfo";
import authReducer, { initialAuthState } from "../../redux/reducers/auth";

export const AuthState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [loading, setLoading] = useState(true);
  const netinfo = useNetInfo();
  useEffect(() => {
    async function useEffFunc() {
      const userFromStorageString = await AsyncStorage.getItem("user");
      if (!userFromStorageString) {
        setLoading(false);
        if (netinfo.isConnected) {
          const curDeviceId = await getDeviceId();
          if (!curDeviceId) await setDeviceId();
        }
        return;
      }
      const userFromStorage = JSON.parse(userFromStorageString);
      setLoading(false);
      setUser(userFromStorage);
    }
    useEffFunc();
  }, [netinfo.isConnected]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
