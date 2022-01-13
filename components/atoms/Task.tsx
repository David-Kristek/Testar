import React, { useEffect, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Animated,
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
import Icon from "react-native-vector-icons/AntDesign";
import { deleteTask } from "../../redux/slicers/task";
import { useAppDispatch } from "../../store";
import Button from "../others/Button";
interface Props {
  title: string;
  subject: string;
  color: string;
  description?: string;
  id: string;
}

export default function Task({
  title,
  subject,
  color,
  description,
  id,
}: Props) {
  const [height, setHeight] = React.useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  useEffect(() => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);
  const deleteHandler = () => {
    dispatch(deleteTask({ index: id }));
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <Menu style={{ marginTop: 20, position: "relative" }}>
        <MenuTrigger triggerOnLongPress>
          <Animated.View
            style={[
              styles.taskBox,
              {
                backgroundColor: color,
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ]}
          >
            <Image
              source={require("../../assets/screenimages/pin.png")}
              style={styles.pin}
            />

            <View style={styles.box}>
              <View>
                <Text style={{ fontSize: 20 }}>{title}</Text>
              </View>
              <Text style={styles.subject}>{subject}</Text>
            </View>
            {description ? (
              <Text style={{ fontSize: 14, paddingBottom: 5 }}>
                {description}
              </Text>
            ) : (
              <></>
            )}
          </Animated.View>
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
            onSelect={deleteHandler}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "red" }}>Odstranit</Text>
            <Icon name="delete" size={20} color="red" />
          </MenuOption>
        </MenuOptions>
      </Menu>
    </>
  );
}
const styles = StyleSheet.create({
  taskBox: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
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
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
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
