import React, { createContext } from "react";
interface AuthContextInterface {
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
export const AuthContext = createContext<AuthContextInterface>({
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loading: true,
});
const authContext = createContext(AuthContext);

export default authContext;