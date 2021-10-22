import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";

import { RootNavProps } from "../types";

export default function TabOneScreen({ navigation }: RootNavProps<"Home">) {
  return (
    <>
      <Header btw>
        <Text style={styles.bigFont}>2021 Říjen</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-v" size={30} />
        </TouchableOpacity>
      </Header>
      <View style={styles.container}>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  bigFont: {
    fontSize: 22,
  },
});
