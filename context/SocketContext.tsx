import React, {
  createContext,
  useContext,
  FC,
  useState,
  useMemo,
  useEffect,
} from "react";
// const ENDPOINT = "https://testar-server.herokuapp.com/";
const ENDPOINT = "http://10.0.0.2:5000/";
import socketIOClient, { Socket } from "socket.io-client";
import { socketTaskAdded, socketTaskDeleted } from "../redux/slicers/task";
import socketListeners from "../services/socket";
import { useAppDispatch, useAppSelector } from "../store";

export type SocketContextState = {
  socket: Socket | null;
};
const contextDefaultValues: SocketContextState = {
  socket: null,
};

export const SocketContext =
  createContext<SocketContextState>(contextDefaultValues);

const SocketProvider: FC = ({ children }) => {
  const { logged, user } = useAppSelector((state) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!logged || socket) return;
    const newSocket = socketIOClient(ENDPOINT, {
      query: { token: user?.token },
    });
    const socketHandler = new socketListeners(newSocket, dispatch);

    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
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
