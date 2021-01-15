import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/user/actions";

export default function SignUp() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput placeholder="name" onChangeText={setName} style={styles.input} />
      <TextInput placeholder="email" onChangeText={setEmail} style={styles.input} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
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
    backgroundColor: "#d4d4f7",
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
    marginBottom: 100,
  },
});
