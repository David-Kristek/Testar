import React, { useState, useContext } from "react";
import Expo from "expo";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Input from "../../components/Input";
const appId = "1047121222092614";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import { AuthNavProps } from "./index";
import { AuthContext } from "../../context/AuthContext";
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
  const { register } = useContext(AuthContext);
  const onRegisterPress = async () => {
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
    const res = await register(
      nameInput,
      emailInput,
      groupInput,
      bakalariNameInput,
      bakalariPwdInput
    );
    console.log(res);
    if (res.groupname) {
      setGroupError(res.groupname);
    }
    if (res.bakalariError) {
      setBakalariError(res.bakalariError);
    }
    if (res.waitForVerify) {
      setwaitForVerify(true);
    }
    setLoading(false);
    if (res.logged) {
      // @ts-ignore
      navigation.navigate("Calendar", { screen: "CalendarScreen" });
    }
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
const styles = StyleSheet.create({
  navigate: {
    padding: 5,
    paddingTop: 8,
    color: "blue",
    textDecorationLine: "underline",
  },
  loginScreenContainer: {
    flex: 1,
    height: "100%",
    padding: "10%",
    paddingVertical: "30%",
    // justifyContent: "center"
  },
  logoBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: "3%",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    paddingLeft: 10,
  },
  loginFormView: {
    flex: 1,
    marginBottom: 150,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    paddingTop: 10,
  },
  error: {
    color: "red",
  },
  alert: {
    backgroundColor: "limegreen",
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    borderRadius: 20,
    color: "black",
    textAlign: "center",
  },
});
