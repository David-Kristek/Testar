import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { isDevice } from "expo-device";

type LoginParams = {
  email: string;
  password: string;
};

interface AuthContextInterface {
  user: User;
  login: (username: string, email: string, groupname: string) => Promise<any>;
  register: (
    username: string,
    email: string,
    groupname: string,
    bakalariusername: string,
    bakalaripassword: string
  ) => Promise<any>;
  logout: () => void;
  loading: boolean;
}
export const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loading: true,
});
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function useEffFunc() {
      const userFromStorageString = await AsyncStorage.getItem("user");
      if (!userFromStorageString) {
        setLoading(false);
        return;
      }
      const userFromStorage = JSON.parse(userFromStorageString);
      setLoading(false);
      setUser(userFromStorage);
    }
    useEffFunc();
  }, []);
  const login = async (username: string, email: string, groupname: string) => {
    const address = await getDeviceId();
    var res;
    try {
      res = await axios({
        url: "http://10.0.0.2:5000/auth/login",
        data: {
          username,
          groupname,
          email,
          address,
        },
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }
    if (!res) return false;
    if (res.data.token && res.data.user) {
      const { token, user } = res.data;
      const userdata = {
        username: user.username,
        groupname,
        token,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userdata));
      setUser(userdata);
      return { logged: true };
    }
    return res.data;
  };

  const register = async (
    username: string,
    email: string,
    groupname: string,
    bakalariusername: string,
    bakalaripassword: string
  ) => {
    const address = await getDeviceId();
    var res;
    try {
      res = await axios({
        url: "http://10.0.0.2:5000/auth/create_group",
        data: {
          username,
          groupname,
          email,
          bakalariusername,
          bakalaripassword,
          address,
        },
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }
    if (!res) return false;
    console.log(res.data);
    if (res.data.token && res.data.user) {
      const { token, user } = res.data;
      const userdata = {
        username: user.username,
        groupname,
        token,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userdata));
      setUser(userdata);
      return { logged: true };
    }
    return res.data;
  };

  const getDeviceId = async () => {
    console.log(isDevice, "device");
    if (isDevice) return "emulator";
    let uuid = uuidv4();
    await SecureStore.setItemAsync("secure_deviceid", JSON.stringify(uuid));
    let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
    return fetchUUID;
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login,
        logout: () => {},
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
