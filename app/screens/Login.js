import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Fontisto, Ionicons } from "@expo/vector-icons";

function Login(props) {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text></Text>
      </View>
      <View style={styles.login}>
        <Ionicons name="person" size={24} color="white" />
        <TextInput
          style={styles.textInput}
          textContentType="emailAddress"
          editable
          placeholder="Email"
        />
      </View>
      <View style={styles.login}>
        <Fontisto name="locked" size={24} color="white" />
        <TextInput
          style={styles.textInput}
          textContentType="password"
          editable
          placeholder="senha"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#026B2E",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    height: 38,
    width: "70%",
    position: "relative",
    bottom: 50,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    height: 50,
    width: "70%",
    position: "relative",
    bottom: 50,
    margin: 10,
    borderRadius: 10,
  },
  textInput: {
    marginLeft: 8,
    width: "90%",
    height: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderBottomEndRadius: 50,
  },
});

export default Login;
