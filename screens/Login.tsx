import React, { useState } from "react";
import Expo from "expo";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";
import { RootNavProps } from "../types";
export default function LoginScreen({ navigation }: RootNavProps<"Login">) {
  const [nameInput, setNameInput] = useState("");
  const [groupInput, setGroupInput] = useState("");
  const onLoginPress = () => {
    navigation.navigate("Home");
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
        <Text style={styles.label}>Vaše jméno: </Text>
        <Text style={styles.error}>Jméno je moc dlouhé!</Text>
        <Input placeholder="Jméno" set={setNameInput} />
        <Text style={styles.label}>Do jaké skupiny se chcete připojit? </Text>
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
});
