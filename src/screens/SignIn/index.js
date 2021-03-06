import { Text, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user/actions";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Constants from "expo-constants";
import { selectMessage } from "../../store/appState/selectors";
import Logo from "../../components/Logo";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const message = useSelector(selectMessage);
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Login</Text>
      {<Text style={styles.error}>{message && message.text}</Text>}
      <TextInput
        autoCompleteType="email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="email"
      />
      <TextInput
        autoCompleteType="password"
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="password"
        value={password}
      />

      <Button
        text="Login"
        onPress={() => dispatch(login(email, password))}
        style={{ backgroundColor: "rgb(245, 201, 72)" }}
      />

      <Button
        text="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
        style={{ backgroundColor: "rgb(245, 201, 72)" }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 10,
  },
  title: {
    fontSize: 26,
  },
  error: {
    color: "#dc3545",
  },
});
