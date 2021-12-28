import React, { useState, useContext, useEffect } from "react";
import Expo from "expo";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Input from "../../components/Input";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import { AuthNavProps } from "./index";
import { AuthContext } from "../../context/Auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../redux/actions/auth";
import { RootState } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";
import styles from "./style";
export default function LoginScreen({ navigation }: AuthNavProps<"Login">) {
  const navCalendar = useNavigation(); /// <-- that isn't needed, you can directly use navigation prop
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [groupInput, setGroupInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [groupError, setGroupError] = useState("");
  const [waitForVerify, setwaitForVerify] = useState(false);

  const { logged } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();
  const onLoginPress = async () => {
    setLoginError("");
    setGroupError("");
    setwaitForVerify(false);
    if (!nameInput || !emailInput) {
      setLoginError("Vyplňte všechny údaje");
      return;
    }
    if (!groupInput) {
      setGroupError("Vyplňte název skupiny");
      return;
    }
    setLoading(true);
    dispatch(
      login({ username: nameInput, email: emailInput, groupname: groupInput })
    )
      .then((res) => {
        setLoading(false);
        if (res.waitForVerify) {
          setwaitForVerify(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.groupname) {
          setGroupError(err.groupname);
        }
        if (typeof err === "string") {
          setLoginError(err);
        }
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
        {waitForVerify ? (
          <Text style={styles.alert}>
            Nyní vám přišel email, ten ověřte, vraťte se do aplikace a klikněte
            znovu na připojit
          </Text>
        ) : (
          <></>
        )}
        <Text style={styles.label}>Vaše údaje: </Text>
        {loginError ? <Text style={styles.error}>{loginError}</Text> : <></>}
        <Input placeholder="Jméno" set={setNameInput} />
        <Input placeholder="Email" set={setEmailInput} />
        <Text style={styles.label}>Do jaké skupiny se chcete připojit?</Text>
        {groupError ? <Text style={styles.error}>{groupError}</Text> : <></>}
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
