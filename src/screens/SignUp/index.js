import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/user/actions";
import Button from "../../components/Button";
import { selectMessage } from "../../store/appState/selectors";
import Logo from "../../components/Logo";

export default function SignUp() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const message = useSelector(selectMessage);

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Create an account </Text>
      {<Text style={styles.error}>{message && message.text}</Text>}
      <TextInput
        autoCompleteType="name"
        autoCapitalize="words"
        value={name}
        placeholder="name"
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        autoCompleteType="email"
        autoCapitalize="none"
        value={email}
        placeholder="email"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        autoCompleteType="password"
        placeholder="password"
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
        value={password}
      />
      <Button
        style={{ backgroundColor: "rgb(245, 201, 72)" }}
        onPress={() => dispatch(signUp(name, email, password))}
        text="Sign Up"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#d4d4f7",
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
    marginBottom: 40,
  },
  error: {
    color: "#dc3545",
  },
});
