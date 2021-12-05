import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { HsvColor } from "react-native-color-picker/dist/typeHelpers";
import { AuthContext } from "./AuthContext";

interface CalendarContextInterface {
  timeTableData: TimeTable[][] | null;
  tasksData: Task[] | null;
  loading: boolean;
  addTask: (
    title: string,
    description: string,
    type: string,
    color: string,
    date: DateData,
    subject: { index: number; title: string }
  ) => Promise<any>;
}

export const CalendarContext = React.createContext<CalendarContextInterface>({
  timeTableData: null,
  tasksData: null,
  loading: false,
  addTask: async () => {},
});

export const CalendarProvider: React.FC = ({ children }) => {
  const [timeTableData, setTimeTableData] = useState<TimeTable[][] | null>(
    null
  );
  const [tasksData, setTasksData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
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
      const calendarData = await getCalendarData();
      if (calendarData.timetable && calendarData.tasks) {
        setTimeTableData(calendarData.timetable);
        setTasksData(calendarData.tasks);
      }

      setLoading(false);
    }
    useEffFunc();
  }, []);
  const getCalendarData = async () => {
    var res;
    try {
      res = await axios({
        url: "http://10.0.0.2:5000/calendar/get_data",
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
  const addTask = async (
    title: string,
    description: string,
    type: string,
    color: string,
    date: DateData,
    subject: { index: number; title: string }
  ) => {
    var res;
    console.log("axios fetching");

    try {
      res = await axios({
        url: "http://10.0.0.2:5000/calendar/add_task",
        headers: {
          token: user?.token ?? "",
        },
        data: {
          title,
          description,
          type,
          color,
          date,
          subject,
        },
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }
    console.log(res?.data);

    return res?.data;
  };
  return (
    <CalendarContext.Provider
      value={{
        timeTableData,
        tasksData,
        loading,
        addTask,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
