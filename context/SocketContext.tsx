import React, { createContext, useContext, FC, useState, useMemo } from "react";
// const ENDPOINT = "https://testar-server.herokuapp.com/";
const ENDPOINT = "http://10.0.0.2:5000/";
import socketIOClient, { Socket } from "socket.io-client";
import { AuthContext } from "./Auth/AuthContext";

export type SocketContextState = {
  socket: Socket | null;
};
const contextDefaultValues: SocketContextState = {
  socket: null,
};

export const SocketContext =
  createContext<SocketContextState>(contextDefaultValues);

const SocketProvider: FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  const socket = useMemo(() => {    
    if (!user) return null;
    return socketIOClient(ENDPOINT, { query: { token: user?.token } });
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
