import React, { useState, useContext } from "react";
import Expo from "expo";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Input from "../../components/Input";
const appId = "1047121222092614";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import { AuthNavProps } from "./index";
import { AuthContext } from "../../context/Auth/AuthContext";
import styles from "./style";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { register } from "../../redux/actions/auth";
export default function RegisterScreen({
  navigation,
}: AuthNavProps<"Register">) {
  const [loading, setLoading] = useState(false);
  const [groupInput, setGroupInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [bakalariNameInput, setBakalariNameInput] = useState("");
  const [bakalariPwdInput, setBakalariPwdInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [groupError, setGroupError] = useState("");
  const [bakalariError, setBakalariError] = useState("");
  const [waitForVerify, setwaitForVerify] = useState(false);

  const dispatch = useAppDispatch();

  const onRegisterPress = () => {
    setLoginError("");
    setGroupError("");
    setBakalariError("");
    setwaitForVerify(false);
    if (!groupInput) {
      setGroupError("Vyplňte název skupiny");
      return;
    }
    if (!nameInput || !emailInput) {
      setLoginError("Vyplňte všechny údaje");
      return;
    }
    if (!bakalariNameInput || !emailInput) {
      setBakalariError("Vyplňte všechny údaje");
      return;
    }
    setLoading(true);
    dispatch(
      register({
        username: nameInput,
        email: emailInput,
        groupname: groupInput,
        bakalariusername: bakalariNameInput,
        bakalaripassword: bakalariPwdInput,
      })
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
        if (err.bakalariError) {
          setBakalariError(err.bakalariError);
        }
        if (typeof err === "string") {
          setLoginError(err);
        }
      });
  };

  return (
    // <KeyboardAvoidingView style={styles.containerView} behavior="padding">
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView style={styles.loginScreenContainer}>
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
        <Text style={styles.label}>Jak se bude skupina jmenovat ?</Text>
        {groupError ? <Text style={styles.error}>{groupError}</Text> : <></>}
        <Input placeholder="Jméno skupiny" set={setGroupInput} />
        <Text style={styles.label}>Vaše údaje: </Text>
        {loginError ? <Text style={styles.error}>{loginError}</Text> : <></>}
        <Input placeholder="Jméno" set={setNameInput} />
        <Input placeholder="Email" set={setEmailInput} />
        <Text style={styles.label}>Vaše údaje do bakalářů: </Text>
        {bakalariError ? (
          <Text style={styles.error}>{bakalariError}</Text>
        ) : (
          <></>
        )}
        <Input placeholder="Uživatelské jméno" set={setBakalariNameInput} />
        <Input placeholder="Heslo" set={setBakalariPwdInput} />
        <Button text="Připojit se" onPress={onRegisterPress} loading={false} />
        <Text
          style={styles.navigate}
          onPress={() => navigation.navigate("Login")}
        >
          Chcete se připojit ke skupině ?
        </Text>
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
}
