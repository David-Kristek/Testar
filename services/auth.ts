import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// const API =  "https://testar-server.herokuapp.com"
const API =  "http://10.0.0.2:5000"
export type loginProps = {
    username: string;
    email: string;
    groupname: string;
  };
  

export const login = ({username, email, groupname}: loginProps) => {
  //   const address = await getDeviceId();
  return axios({
    url: `${API}/auth/login`,
    data: {
      username,
      groupname,
      email,
      address : "84541795-05b3-4450-ae40-8caee03afec9",
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

export const register = ({
  username,
  email,
  groupname,
  bakalariusername,
  bakalaripassword,
}: registerProps) => {
  //   const address = await getDeviceId();
  return axios({
    url: `${API}/auth/create_group`,
    data: {
      username,
      groupname,
      email,
      bakalariusername,
      bakalaripassword,
      address : "84541795-05b3-4450-ae40-8caee03afec9",
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
