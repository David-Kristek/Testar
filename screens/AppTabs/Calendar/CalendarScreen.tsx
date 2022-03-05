import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import Header from "../../../components/others/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import { CalendarNavProps } from "./index";
import { data } from "../../../hooks/useCalendarData";
import CalendarComponent from "../../../components/moleculs/CalendarComponent";
import SideMenu from "../../../components/atoms/SideMenu";
import { useGetTasksQuery } from "../../../services/task";
import { useAppDispatch, useAppSelector } from "../../../store";
import TimeTable from "../../../components/moleculs/Timetable";
import TaskList from "../../../components/moleculs/TaskList";
import Animated, { Easing, FadeInUp, Layout } from "react-native-reanimated";
import FloatingButton from "../../../components/atoms/FloatingButton";

export type activeSubject = {
  index: number;
  title: string;
};
export type activeDate = {
  month: number;
  day: number;
  dayInWeek: number;
};

export default function Calendar({
  navigation,
}: CalendarNavProps<"CalendarScreen">) {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const year = useRef({ count: date.getFullYear() });
  const [activeDate, setActiveDate] = useState<activeDate>({
    month: month,
    day: 0,
    dayInWeek: date.getDay(),
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activeSubject, setActiveSubject] = useState<activeSubject>({
    index: -1,
    title: "",
  });
  const flatListRef = useRef<FlatList>(null);
  const { refetch } = useGetTasksQuery({});
  const screenWidth = Dimensions.get("window").width;
  const dispatch = useAppDispatch();
  const calendarRender = useRef({ is: false });
  const DATA = [
    {
      id: 0,
      month,
      year: year.current.count,
    },
    {
      id: 1,
      month,
      year: year.current.count,
    },
    {
      id: 2,
      month,
      year: year.current.count,
    },
  ];
  const refreshHandler = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    });
  };
  const nextMonth = () => {
    setMonth((month: number) => {
      if (month === 11) {
        year.current.count += 1;
        return 0;
      } else return month + 1;
    });
  };
  const previousMonth = () => {
    setMonth((month: number) => {
      if (month === 0) {
        year.current.count -= 1;
        return 11;
      } else return month - 1;
    });
  };
  const _onViewableItemsChanged = useCallback((item: any) => {
    if (item.viewableItems.length === 1) {
      if (item.viewableItems[0]?.index === 0) {
        previousMonth();
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ animated: false, index: 1 });
        }, 20);
        setActiveDate({ month: 0, day: 0, dayInWeek: -1 });
      } else if (item.viewableItems[0]?.index === 2) {
        nextMonth();
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ animated: false, index: 1 });
        }, 50);
        setActiveDate({ month: 0, day: 0, dayInWeek: -1 });
      }
    }
  }, []);
  const renderItem = ({ item }: any) => {
    // console.log(item.id);
    return (
      <View style={{ width: screenWidth * 0.84 }}>
        <CalendarComponent
          month={item.month}
          year={item.year}
          id={item.id}
          active={activeDate}
          setActive={setActiveDate}
          key={item.id}
        />
      </View>
    );
  };
  return (
    <>
      <Header btw>
        <View style={styles.row}>
          <Text
            style={[styles.month, { paddingTop: 50 }]}
          >{`${year.current.count} ${data.months[month].name}`}</Text>
        </View>
        <SideMenu />
      </Header>
      <View style={styles.container}>
        <Animated.View entering={FadeInUp.delay(100).duration(300)}>
          <View style={styles.weekDaysCon}>
            {data.days.map((day, index) => (
              <Text
                key={index}
                style={[styles.dayCl, styles.weekDay]}
              >{`${day[0]}${day[1]}`}</Text>
            ))}
          </View>
          <FlatList
            data={DATA}
            horizontal
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            snapToAlignment={"center"}
            snapToInterval={screenWidth * 0.84}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={_onViewableItemsChanged}
            pagingEnabled={true}
            initialScrollIndex={1}
            ref={flatListRef}
            viewabilityConfig={{
              minimumViewTime: 150,
              itemVisiblePercentThreshold: 10,
            }}
            onRefresh={refreshHandler}
            refreshing={refreshing}
          />
        </Animated.View>
        <TimeTable
          setActiveSubject={setActiveSubject}
          activeSubject={activeSubject}
          activeDate={activeDate}
          // canRender={calendarRender.current.is}
        />
        <TaskList activeDate={activeDate} />

        <FloatingButton
          navigateToAddTask={(type: TaskType) => {
            navigation.navigate("AddTask", {
              subject: activeSubject,
              activeDate: {
                day: activeDate.day,
                month: activeDate.month,
                year: year.current.count,
              },
              type,
            });
          }}
          visble={!!(activeSubject.title && activeDate.dayInWeek !== -1)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    paddingHorizontal: "8%",
    paddingTop: 25,
    backgroundColor: "rgb(236, 236, 236)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  month: {
    fontSize: 22,
    width: 155,
  },
  dayCl: {
    width: "16.8%",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
  },
  weekDay: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekDaysCon: {
    paddingTop: 3,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  weekCon: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  calendarDay: {
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 4,
  },
  ntCrMth: {
    color: "grey",
  },
  crDay: {
    borderColor: "dodgerblue",
    backgroundColor: "dodgerblue",
    color: "white",
  },
  active: {
    borderColor: "darkblue",
  },
  plus: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "dodgerblue",
    position: "absolute",
    bottom: 25,
    right: "8%",
  },
  arrowCon: {
    flexDirection: "row",
    // marginLeft: 25,
    marginTop: 15,
  },
});
