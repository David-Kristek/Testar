// https://www.toptal.com/react/redux-toolkit-and-rtk-query

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// const API =  "https://testar-server.herokuapp.com"
const API = "http://10.0.0.2:5000/auth";

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

export const login = (loginData: loginProps) => {
  //   const address = await getDeviceId();
  return axios({
    url: `${API}/login`,
    data: {
      ...loginData,
      address: "84541795-05b3-4450-ae40-8caee03afec9",
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

export const register = (registerData: registerProps) => {
  return axios({
    url: `${API}/create_group`,
    data: {
      ...registerData,
      address: "84541795-05b3-4450-ae40-8caee03afec9",
    },
    method: "POST",
  });
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
