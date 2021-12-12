import React, { useContext } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// your entry point
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { CalendarContext } from "../context/CalendarContext";
import Icon from "react-native-vector-icons/AntDesign";

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
  const { deleteTask } = useContext(CalendarContext);
  return (
    <>
      <Menu style={{ marginTop: 20 }}>
        <MenuTrigger triggerOnLongPress>
          <View style={styles.box}>
            <Text style={{ fontSize: 20 }}>{title}</Text>
            <Text style={{ fontSize: 16 }}>{subject}</Text>
          </View>
          {description ? (
            <Text style={{ fontSize: 14, paddingBottom: 5 }}>
              {description}
            </Text>
          ) : (
            <></>
          )}
        </MenuTrigger>
        <View style={[styles.underline, { backgroundColor: color }]}></View>
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
            onSelect={() => deleteTask(id)}
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
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 5,
  },
  underline: {
    width: "100%",
    height: 3,
  },
});
