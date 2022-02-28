// https://www.toptal.com/react/redux-toolkit-and-rtk-query

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// const API =  "https://testar-server.herokuapp.com"
const API = "https://testar-server.herokuapp.com/auth";
// const API = "http://10.0.0.3:5000/auth";
export type loginProps = {
  username: string;
  email: string;
  groupname: string;
};
export const validateLoginData = (loginData: loginProps) => {
  const { username, email, groupname } = loginData;
  if (!username || !email) {
    return { OK: false, error: "Vyplňte všechny údaje" };
  }
  if (!groupname) {
    return { OK: false, error: { groupname: "Vyplňte název skupiny" } };
  }
  return { OK: true };
};
// (dataToValidate,
// [
//   [["username", "email"], "naka chyba"]
//   ["groupname", {groupname: "naka chyba"}]
// ])

export const login = (loginData: loginProps, deviceAddress: string) => {
  return axios({
    url: `${API}/login`,
    data: {
      ...loginData,
      address: deviceAddress,
    },
    method: "POST",
  });
};

export type registerProps = {
  username: string;
  email: string;
  groupname: string;
  bakalariusername: string;
  bakalaripassword: string;
};
export const validateRegisterData = (registerData: registerProps) => {
  const { username, email, groupname, bakalariusername, bakalaripassword } =
    registerData;
  if (!groupname) {
    return { OK: false, error: { groupname: "Vyplňte název skupiny" } };
  }
  if (!username || !email) {
    return { OK: false, error: "Vyplňte všechny údaje" };
  }
  if (!bakalariusername || !bakalaripassword) {
    return {
      OK: false,
      error: { bakalariError: "Vyplňte údaje pro přihlášení do bakalářů" },
    };
  }
  return { OK: true };
};

export const register = (registerData: registerProps, deviceAddress : string) => {
  return axios({
    url: `${API}/create_group`,
    data: {
      ...registerData,
      address: deviceAddress,
    },
    method: "POST",
  });
};

export const getDeviceId = async () => {
  const address = await SecureStore.getItemAsync("secure_deviceid");
  if(address) return address; 
  return await setDeviceId(); 
};
const setDeviceId = async () => {
  let uuid = uuidv4();
  await SecureStore.setItemAsync("secure_deviceid", uuid);
  return uuid;
};
