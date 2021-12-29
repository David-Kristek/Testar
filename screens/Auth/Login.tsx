import React, { useState, useContext, useEffect } from "react";
import Expo from "expo";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Input from "../../components/Input";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import { AuthNavProps } from "./index";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../redux/slicers/auth";

import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";
import styles from "./style";
import { useAppDispatch, useAppSelector } from "../../store";
export default function LoginScreen({ navigation }: AuthNavProps<"Login">) {
  const navCalendar = useNavigation(); /// <-- that isn't needed, you can directly use navigation prop
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [groupInput, setGroupInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const onLoginPress = async () => {
    setLoading(true);
    dispatch(
      login({ username: nameInput, email: emailInput, groupname: groupInput })
    )
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    // <KeyboardAvoidingView style={styles.containerView} behavior="padding">
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginFormView}>
        <View style={styles.logoBox}>
          <Icon name="calendar-outline" size={30} color="black" />
          <Text style={styles.logoText}>Tesťák</Text>
        </View>
        {status?.waitForVerify ? (
          <Text style={styles.alert}>
            Nyní vám přišel email, ten ověřte, vraťte se do aplikace a klikněte
            znovu na připojit
          </Text>
        ) : (
          <></>
        )}
        <Text style={styles.label}>Vaše údaje: </Text>
        {typeof status === "string" ? (
          <Text style={styles.error}>{status}</Text>
        ) : (
          <></>
        )}
        <Input placeholder="Jméno" set={setNameInput} />
        <Input placeholder="Email" set={setEmailInput} />
        <Text style={styles.label}>Do jaké skupiny se chcete připojit?</Text>
        {status?.groupname ? (
          <Text style={styles.error}>{status.groupname}</Text>
        ) : (
          <></>
        )}
        <Input placeholder="Jméno skupiny" set={setGroupInput} />
        <Button text="Připojit se" onPress={onLoginPress} loading={false} />
        <Text
          style={styles.navigate}
          onPress={() => navigation.navigate("Register")}
        >
          Chcete vytvořit skupinu ?
        </Text>
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
}
