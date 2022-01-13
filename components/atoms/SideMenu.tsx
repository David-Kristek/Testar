import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icona from "react-native-vector-icons/AntDesign";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { AuthContext } from "../../context/Auth/AuthContext";
import { logout } from "../../redux/slicers/auth";
import { useAppDispatch } from "../../store";
interface Props {}

export default function SideMenu() {
  const dispatch = useAppDispatch();
  return (
    <Menu>
      <MenuTrigger>
        <Icon name="ellipsis-v" size={30} style={styles.iconStyle} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: styles.menuOptions,
        }}
      >
        <MenuOption
          onSelect={() =>
            Alert.alert("Odhlášení", "Opravdu se chcete odhlásit ?", [
              {
                text: "Zrušit",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () =>{ dispatch(logout())} },
            ])
          }
          style={styles.menuOption}
        >
          <Text style={styles.menuOptionText}>Odhlásit se</Text>
          <Icon name="sign-out" size={20} color="dodgerblue" />
        </MenuOption>
        <MenuOption style={styles.menuOption}>
          <Text style={styles.menuOptionText}>Nastavení</Text>
          <Icona name="setting" size={20} color="dodgerblue" />
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  menuOptions: { marginTop: 82, width: 130 },
  menuOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  menuOptionText: {
    fontSize: 16,
  },
});
