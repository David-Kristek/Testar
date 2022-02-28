import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import socketIOClient, { Socket } from "socket.io-client";
import socketListeners from "./socket";
import axios from "axios";
// predelat na backendu
const API = "https://testar-server.herokuapp.com/task/";
// const API = "http://10.0.0.3:5000/task/";
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: (headers, { getState }) => {
      if ((getState() as RootState).auth.logged) {
        const token = (getState() as RootState).auth.user?.token;
        headers.set("token", token ?? "");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], any>({
      query: () => "",
      // async onCacheEntryAdded(
      //   arg,
      //   {
      //     updateCachedData,
      //     cacheDataLoaded,
      //     cacheEntryRemoved,
      //     getState,
      //     dispatch,
      //   }
      // ) {
      //   // @ts-ignore
      //   const token = getState().auth.user?.token;
      //   const socket = socketIOClient("http://10.0.0.2:5000/", {
      //     query: { token },
      //   });
      //   try {
      //     await cacheDataLoaded;
      //     const socketHandler = new socketListeners(socket, dispatch);
      //     socketHandler.setSockets();
      //   } catch {
      //     await cacheEntryRemoved;
      //     socket.disconnect();
      //   }
      // },
    }),
    // addTask: builder.mutation<any, Task>({
    //   query: (body) => ({ url: "", method: "post", body }),
    // }),
    // deleteTask: builder.mutation<any, string>({
    //   query: (id) => ({ url: `?id=${id}`, method: "delete" }),
    // }),
    getTimeTableData: builder.query<TimeTable[][], void>({
      query: () => "timetable",
    }),
    getSubjectColor: builder.query<any, string>({
      query: (title) => `subject_color?title=${title}`,
    }),
  }),
});
export const {
  useGetTasksQuery,
  useGetTimeTableDataQuery,
  useGetSubjectColorQuery,
} = taskApi;

const addTask = (task: Task, token: string) => {
  return axios({
    url: API,
    method: "post",
    data: task,
    headers: { token },
  });
};
const deleteTask = (taskId: string, token: string) => {
  return axios.delete(API, {
    headers: { token },
    data: { id: taskId },
  });
};
const updateTask = (task: Task, token: string) => {
  return axios({
    url: API,
    method: "PUT",
    data: { task },
    headers: { token },
  });
};
export default { addTask, deleteTask, updateTask };
