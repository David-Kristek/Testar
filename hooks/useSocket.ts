import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import socketIOClient, { Socket } from "socket.io-client";
// import { socketTaskAdded, socketTaskDeleted } from "../redux/slicers/task";
import SocketService from "../services/socket";
const ENDPOINT = "http://10.0.0.2:5000/";

const useSocket = () => {
  const { logged, user } = useAppSelector((state) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!logged || socket) return;
    const newSocket = socketIOClient(ENDPOINT, {
      query: { token: user?.token },
    });
    const socketHandler = new SocketService(newSocket, dispatch);
    socketHandler.setSocketsListeners()
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);
  return [];
};
export default useSocket;
