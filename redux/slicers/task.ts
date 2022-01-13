import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/lib/persistReducer";
import { taskApi } from "../../services/task";

const initialState = { tasks: null, timetable: null } as {
  tasks: Task[] | null;
  timetable: TimeTable[][] | null;
};

type payload<index> = {
  index: index;
  options?: {
    socket: boolean;
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: { type: string; payload: payload<Task> }) => {
      state.tasks = state.tasks
        ? [...state.tasks, action.payload.index]
        : [action.payload.index];
    },
    deleteTask: (state, action: { type: string; payload: payload<string> }) => {
      state.tasks = state.tasks
        ? state.tasks.filter((task) => task._id !== action.payload.index)
        : [];
    },
    failed: () => {},
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        taskApi.endpoints.getTasks.matchPending,
        (state, action) => {}
      )
      .addMatcher(
        taskApi.endpoints.getTasks.matchFulfilled,
        (state, action) => {
          state.tasks = action.payload;
        }
      )
      .addMatcher(
        taskApi.endpoints.getTimeTableData.matchFulfilled,
        (state, action) => {
          state.timetable = action.payload;
        }
      );
    // .addMatcher(taskApi.endpoints.addTask.matchPending, (state, action) => {
    //   const newTask = { ...action.meta.arg.originalArgs, _id: "justCreated" };
    //   state.tasks = state.tasks ? [...state.tasks, newTask] : [newTask];
    // })
    // .addMatcher(taskApi.endpoints.addTask.matchFulfilled, (state, action) => {
    //   const tasks = state.tasks;
    //   const newTask = action.meta.arg.originalArgs;
    //   state.tasks = tasks
    //     ? tasks.map((task) => {
    //         if (task._id === "justCreated" && task.title === newTask.title) {
    //           return { ...task, _id: action.payload.id };
    //         }
    //         return task;
    //       })
    //     : tasks;
    //   SocketService.sendTaskAdded({ ...newTask, _id: action.payload.id });
    // })
    // // pokud bude online jenom se normalne prida
    // .addMatcher(
    //   taskApi.endpoints.deleteTask.matchPending,
    //   (state, action) => {
    //     const deletedId = action.meta.arg.originalArgs;
    //     state.tasks = state.tasks
    //       ? state.tasks.filter((task) => task._id !== deletedId)
    //       : [];
    //   }
    // )
    // .addMatcher(
    //   taskApi.endpoints.deleteTask.matchRejected,
    //   (state, action) => {}
    // )
  },
});
const taskReducer = taskSlice.reducer;
const persistConfig = {
  key: "task",
  version: 1,
  storage: AsyncStorage,
};
export const {  addTask, deleteTask } = taskSlice.actions;
export default persistReducer(persistConfig, taskReducer);
