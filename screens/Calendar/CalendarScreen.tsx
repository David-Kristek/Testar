import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
} from "react-native";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";

import { CalendarNavProps } from "./index";
import { data } from "../../hooks/useCalendarData";
import Subject from "../../components/Subject";
import Task from "../../components/Task";
import CalendarComponent, {
  Props as CalendarProps,
} from "../../components/CalendarComponent";export default function Calendar({
  navigation,
}: CalendarNavProps<"CalendarScreen">) {
  const date = new Date();
  const [onNext, setOnNext] = useState(false);
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const screenWidth = Dimensions.get("window").width;
  const flatListRef = useRef<FlatList>(null);
  const nextMonth = () => {
    setMonth((month: number) => {
      if (month === 11) {
        setYear((cr) => cr + 1);
        return 0;
      } else return month + 1;
    });
  };
  const previousMonth = () => {
    setMonth((month: number) => {
      if (month === 0) {
        setYear((cr) => cr - 1);
        return 11;
      } else return month - 1;
    });
  };
  const DATA = [
    {
      id: 0,
      month,
      year,
    },
    {
      id: 1,
      month,
      year,
    },
    {
      id: 2,
      month,
      year,
    },
  ];
  const _onViewableItemsChanged = useCallback((item: any) => {
    console.log(
      item.viewableItems[0]?.index,
      item.viewableItems[1]?.index,
      item.viewableItems.length
    );
    console.log(item.viewableItems.length === 1);

    if (item.viewableItems.length === 1) {
      if (item.viewableItems[0]?.index === 0) {
        console.log("prev");
        previousMonth();
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ animated: false, index: 1 });
        }, 50);
      } else if (item.viewableItems[0]?.index === 2) {
        console.log("next", !!flatListRef.current);
        nextMonth();
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ animated: false, index: 1 });
        }, 50);
      }
    }
  }, []);
  const renderItem = ({ item }: any) => {
    // console.log(item.id);
    return (
      <View style={{ width: screenWidth * 0.84 }}>
        <CalendarComponent month={item.month} year={item.year} id={item.id} />
      </View>
    );
  };
  return (
    <>
      <Header btw>
        <View style={styles.row}>
          <Text
            style={styles.month}
          >{`${year} ${data.months[month].name}`}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-v" size={30} />
        </TouchableOpacity>
      </Header>
      <View style={styles.container}>
        <View>
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
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={_onViewableItemsChanged}
            pagingEnabled={true}
            initialScrollIndex={1}
            ref={flatListRef}
            viewabilityConfig={{
              minimumViewTime: 150,
              itemVisiblePercentThreshold: 10,
            }}
            // viewabilityConfigCallbackPairs={[
            //   {
            //     viewabilityConfig: {
            //       minimumViewTime: 150,
            //       itemVisiblePercentThreshold: 10,
            //     },
            //     onViewableItemsChanged: _onViewableItemsChanged,
            //   },
            // ]}
          />
          {/* <View style={styles.arrowCon}>
            <TouchableOpacity
              style={{ paddingRight: 10, paddingTop: 3 }}
              onPress={previousMonth}
            >
              <Icon name="chevron-left" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingTop: 3 }} onPress={nextMonth}>
              <Icon name="chevron-right" size={35} color="black" />
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={[styles.row, { marginTop: 20, flexWrap: "wrap" }]}>
          <Subject title="Aj" selected />
          <Subject title="D" />
          <Subject title="Tv" />
          <Subject title="NJ" />
          <Subject title="D" />
          <Subject />
          <Subject title="D" />
          <Subject title="Tv" />
        </View>
        <Task title="Čtvrtletka" subject="Němčina" color="blue" />
        <Task
          title="Domácí úkol"
          subject="Angličtina"
          color="red"
          description="SB 105/5, 6"
        />
        <TouchableOpacity
          style={styles.plus}
          onPress={() => {
            navigation.navigate("AddTask");
          }}
        >
          <Icon name="plus" size={30} color={"white"} />
        </TouchableOpacity>
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
    marginHorizontal: "8%",
    // backgroundColor: "rgb(204, 204, 204)",
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
    paddingBottom: 10,
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
  badgeBox: {
    flexDirection: "row",
    height: 4,
    justifyContent: "center",
    alignItems: "center",
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
    right: 0,
  },
  arrowCon: {
    flexDirection: "row",
    // marginLeft: 25,
    marginTop: 15,
  },
});
