import React, { useEffect, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
// your entry point
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Animated, {
  Layout,
  FadeIn,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/AntDesign";
import { deleteTask } from "../../redux/slicers/task";
import { useAppDispatch } from "../../store";
import Button from "../others/Button";
import { useNavigation } from "@react-navigation/native";

interface Props {
  taskData: Task;
  index: number;
}

export default function Task({ taskData, index }: Props) {
  const { title, subject, description, _id } = taskData;
  const [height, setHeight] = React.useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const deleteHandler = () => {
    dispatch(deleteTask({ index: _id }));
  };
  const updateHandler = () => {
    // @ts-ignore
    navigation.navigate("UpdateTask", taskData);
  };
  return (
    <>
      <Animated.View
        layout={Layout.springify()}
        entering={FadeInLeft.delay(index * 100)}
        exiting={FadeOutRight}
        style={[styles.taskBox, { backgroundColor: subject.color ?? "white" }]}
      >
        <Menu style={{ position: "relative" }}>
          <MenuTrigger triggerOnLongPress>
            <Image
              source={require("../../assets/screenimages/pin.png")}
              style={styles.pin}
            />
            <View style={styles.container}>
              <View style={styles.box}>
                <View>
                  <Text style={{ fontSize: 20 }}>{title}</Text>
                </View>
                <Text style={styles.subject}>{subject.title}</Text>
              </View>
              {description ? (
                <Text style={{ fontSize: 14, paddingBottom: 5 }}>
                  {description}
                </Text>
              ) : (
                <></>
              )}
            </View>
          </MenuTrigger>
          {/* <View style={[styles.underline, { backgroundColor: color }]}></View> */}
          <MenuOptions
            customStyles={{
              optionsContainer: {
                marginTop: 36,
                width: 100,
                marginLeft: Dimensions.get("screen").width * 0.85 - 100,
              },
            }}
          >
            <MenuOption
              onSelect={updateHandler}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "blue" }}>Upravit</Text>
              <Icon name="edit" size={20} color="blue" />
            </MenuOption>
            <MenuOption
              onSelect={deleteHandler}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "red" }}>Odstranit</Text>
              <Icon name="delete" size={20} color="red" />
            </MenuOption>
          </MenuOptions>
        </Menu>
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  taskBox: {
    marginTop: 20,
    borderRadius: 8,
    borderTopRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  container: { paddingHorizontal: 15, paddingVertical: 10 },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  underline: {
    width: "100%",
    height: 3,
  },
  pin: {
    width: 25,
    height: 25,
    position: "absolute",
    right: -10,
    top: -12,
  },
  subject: {
    fontSize: 14,
    padding: 6,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "black",
    borderRadius: 8,
  },
});
