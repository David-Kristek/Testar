import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Input from "../../components/Input";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import { AuthNavProps } from "./index";
import styles from "./style";
import { useAppDispatch, useAppSelector } from "../../store";
import { register } from "../../redux/slicers/auth";
export default function RegisterScreen({
  navigation,
}: AuthNavProps<"Register">) {
  const [loading, setLoading] = useState(false);
  const [groupInput, setGroupInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [bakalariNameInput, setBakalariNameInput] = useState("");
  const [bakalariPwdInput, setBakalariPwdInput] = useState("");

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  const onRegisterPress = () => {
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
    <ScrollView style={styles.loginScreenContainer}>
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
        <Text style={styles.label}>Jak se bude skupina jmenovat ?</Text>
        {status?.groupname ? (
          <Text style={styles.error}>{status.groupname}</Text>
        ) : (
          <></>
        )}
        <Input placeholder="Jméno skupiny" set={setGroupInput} />
        <Text style={styles.label}>Vaše údaje: </Text>
        {typeof status === "string" ? (
          <Text style={styles.error}>{status}</Text>
        ) : (
          <></>
        )}
        <Input placeholder="Jméno" set={setNameInput} />
        <Input placeholder="Email" set={setEmailInput} />
        <Text style={styles.label}>Vaše údaje do bakalářů: </Text>
        {status?.bakalariError ? (
          <Text style={styles.error}>{status.bakalariError}</Text>
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
