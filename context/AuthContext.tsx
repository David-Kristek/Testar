import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useNetInfo } from "@react-native-community/netinfo";
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
  const login = async (username: string, email: string, groupname: string) => {
    const address = await getDeviceId();
    var res;
    try {
      res = await axios({
        url: "https://testar-server.herokuapp.com/auth/login",
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
      const { token, user, email } = res.data;
      const userdata = {
        username: user.username,
        groupname,
        token,
        email,
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
        url: "https://testar-server.herokuapp.com/auth/create_group",
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
    // console.log(res.data);
    if (res.data.token && res.data.user) {
      const { token, user, email } = res.data;
      const userdata = {
        username: user.username,
        groupname,
        token,
        email,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userdata));
      setUser(userdata);
      return { logged: true };
    }
    return res.data;
  };

  const getDeviceId = async () => {
    let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
    // console.log(fetchUUID, "uuuiiid");
    return fetchUUID;
  };
  const setDeviceId = async () => {
    let uuid = uuidv4();
    await SecureStore.setItemAsync("secure_deviceid", JSON.stringify(uuid));
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
