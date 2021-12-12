import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { HsvColor } from "react-native-color-picker/dist/typeHelpers";
import { AuthContext } from "./AuthContext";
import { useNetInfo } from "@react-native-community/netinfo";

interface CalendarContextInterface {
  timeTableData: TimeTable[][] | null;
  tasksData: Task[] | null;
  loading: boolean;
  addTask: (task: Task) => Promise<any>;
  deleteTask: (id: string) => Promise<any>;
  callRefresh: () => void;
}

export const CalendarContext = React.createContext<CalendarContextInterface>({
  timeTableData: null,
  tasksData: null,
  loading: false,
  addTask: async () => {},
  deleteTask: async () => {},
  callRefresh: () => {},
});

export const CalendarProvider: React.FC = ({ children }) => {
  const [timeTableData, setTimeTableData] = useState<TimeTable[][] | null>(
    null
  );
  const netInfo = useNetInfo();
  const [tasksData, setTasksData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
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
                switch (request.key) {
                  case "addtask":
                    addTask(request.newTask);
                    break;
                  case "deletetask":
                    deleteTask(request.id);
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
  }, [netInfo.isConnected , refresh]);
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
        "calendarData",
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
      "calendarData",
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
      await AsyncStorage.setItem(
        "offlineRequests",
        JSON.stringify(offlineRequests.push({ [key]: toStore }))
      );
    }
  };
  const callRefresh = () => {
    setRefresh(cur => !cur)
  }
  return ( 
    <CalendarContext.Provider
      value={{
        timeTableData,
        tasksData,
        loading,
        addTask,
        deleteTask,
        callRefresh
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
