import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { HsvColor } from "react-native-color-picker/dist/typeHelpers";
import { AuthContext } from "./Auth/AuthContext";
import { useNetInfo } from "@react-native-community/netinfo";
import { SocketContext } from "./SocketContext";

interface CalendarContextInterface {
  timeTableData: TimeTable[][] | null;
  tasksData: Task[] | null;
  loading: boolean;
  addTask: (task: Task) => Promise<any>;
  deleteTask: (id: string) => Promise<any>;
  getSubject: (title: string, date: DateData) => Promise<any>;
  callRefresh: () => void;
}

export const CalendarContext = React.createContext<CalendarContextInterface>({
  timeTableData: null,
  tasksData: null,
  loading: false,
  addTask: async () => {},
  deleteTask: async () => {},
  getSubject: async () => {},
  callRefresh: () => {},
});

export const CalendarProvider: React.FC = ({ children }) => {
  const [timeTableData, setTimeTableData] = useState<TimeTable[][] | null>(
    null
  );
  const netInfo = useNetInfo();
  const [tasksData, setTasksData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    async function useEffFunc() {
      const calendarDataFromStrorage = await AsyncStorage.getItem(
        "calendardata"
      );
      if (calendarDataFromStrorage) {
        const calendarData = JSON.parse(calendarDataFromStrorage);
        setTimeTableData(calendarData.timetable);
        setTasksData(calendarData.tasks);
        setLoading(false);
      }

      if (netInfo.isConnected) {
        const calendarData = await getCalendarData();
        if (calendarData.timetable && calendarData.tasks) {
          setTimeTableData(calendarData.timetable);
          setTasksData(calendarData.tasks);
          await AsyncStorage.setItem(
            "calendardata",
            JSON.stringify(calendarData)
          );

          setLoading(false);
          // resolve offline requests:
          const offlineRequestsString = await AsyncStorage.getItem(
            "offlineRequests"
          );
          if (offlineRequestsString) {
            const offlineRequests = JSON.parse(offlineRequestsString);
            if (offlineRequests) {
              offlineRequests.forEach((request: any) => {
                switch (true) {
                  case !!request.addtask:
                    console.log("adding task from offline");
                    addTask(request.addtask);
                    break;
                  case !!request.deletetask:
                    console.log("deleting task from offline");
                    deleteTask(request.deletetask);
                    break;
                  default:
                    console.log("nope");
                }
                AsyncStorage.setItem("offlineRequests", "");
              });
            }
          }
        }
      }
      // setLoading(false);
    }
    useEffFunc();
    setSockets();
    return () => {
      socket?.off("addingTask"); 
      socket?.off("addingTaskOver"); 
      socket?.off("taskAdded"); 
    }
  }, [netInfo.isConnected, refresh]);
  const getCalendarData = async () => {
    var res;
    try {
      res = await axios({
        url: "https://testar-server.herokuapp.com/calendar/get_data",
        headers: {
          token: user?.token ?? "",
        },
        method: "GET",
      });
    } catch (err) {
      console.log(err);
    }
    return res?.data;
  };
  const addTask = async (newTask: Task) => {
    var res;
    if (netInfo.isConnected) {
      try {
        res = await axios({
          url: "https://testar-server.herokuapp.com/calendar/add_task",
          headers: {
            token: user?.token ?? "",
          },
          data: newTask,
          method: "POST",
        });
      } catch (err) {
        console.log(err);
      }
    }
    console.log(res?.data);
    addToOffline("addtask", newTask);
    var newTasksData;
    if (
      tasksData &&
      tasksData?.filter(
        (task) =>
          task.title === newTask.title &&
          task.subject.title === newTask.subject.title
      ).length < 1
    ) {
      newTasksData = tasksData ? [...tasksData, newTask] : null;
      setTasksData(newTasksData);

      await AsyncStorage.setItem(
        "calendardata",
        JSON.stringify({ timeTableData, tasks: newTasksData })
      );
    }
  };
  const deleteTask = async (id: string) => {
    var res;
    if (netInfo.isConnected) {
      try {
        res = await axios({
          url: `https://testar-server.herokuapp.com/calendar/delete_task?id=${id}`,
          headers: {
            token: user?.token ?? "",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    addToOffline("deletetask", id);
    // console.log(res?.data);
    const newTasksData = tasksData
      ? tasksData.filter((task) => task._id !== id)
      : [];
    setTasksData(newTasksData);
    await AsyncStorage.setItem(
      "calendardata",
      JSON.stringify({ timeTableData, tasks: newTasksData })
    );
  };
  const addToOffline = async (key: string, toStore: any) => {
    if (!netInfo.isConnected) {
      const offlineRequestsString = await AsyncStorage.getItem(
        "offlineRequests"
      );
      var offlineRequests = [];
      if (offlineRequestsString)
        offlineRequests = JSON.parse(offlineRequestsString);
      offlineRequests.push({ [key]: toStore });
      await AsyncStorage.setItem(
        "offlineRequests",
        JSON.stringify(offlineRequests)
      );
    }
  };
  const callRefresh = () => {
    setRefresh((cur) => !cur);
  };
  const getSubject = async (title: string, date: DateData) => {
    var res;
    try {
      res = await axios(`http://10.0.0.2:5000/calendar/get_subject`, {
        method: "POST",
        headers: {
          token: user?.token ?? "",
        },
        data: {
          title,
          date,
        },
      });
    } catch (err) {
      console.log(err);
    }
    return res?.data;
  };
  const setSockets = () => {
    socket?.on("test", (testVal => {
      console.log(testVal);
      
    }))
    socket?.on("addingTask", (dateData: DateData, userS: OtherUser) => {
      console.log("adding task", userS.email, dateData, "logged by" , user?.email);
      setTasksData((currTasks) => {
        const type: TaskType = "progress";
        const newTask = {
          title: "",
          subject: {
            title: "",
            color: "",
            index: 0,
          },
          date: dateData,
          createdByUser: userS,
          type,
          description: "",
          _id: "",
        };
        return currTasks ? [...currTasks, newTask] : [newTask];
      });
    });
    
    socket?.on("addingTaskOver", (dateData: DateData, userS: OtherUser) => {
      console.log("adding task over", userS.email, dateData, "logged by" , user?.email);
      setTasksData((currTasks) =>
        currTasks
          ? currTasks.filter(
              (task) =>
                task.createdByUser.email !== userS.email &&
                task.date !== dateData
            )
          : null
      );
    });
    socket?.on("taskAdded", (task: Task) => {
      setTasksData((currTasks) => (currTasks ? [...currTasks, task] : [task]));
    });
  };
  return (
    <CalendarContext.Provider
      value={{
        timeTableData,
        tasksData,
        loading,
        addTask,
        deleteTask,
        getSubject,
        callRefresh,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
