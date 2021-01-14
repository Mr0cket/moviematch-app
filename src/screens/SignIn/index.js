import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
export default function SignIn() {
  // console.log("systemTheme:", systemTheme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput onChangeText={setEmail} style={styles.input} />
      <TextInput onChangeText={setPassword} style={styles.input} />
      <TouchableOpacity onPress={() => console.log("login")} style={styles.button}>
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("signup")} style={styles.button}>
        <Text style={styles.buttonText}>signUp</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 40,
    justifyContent: "center",
    backgroundColor: "rgb(245, 201, 72)",
    width: 150,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  title: {
    fontSize: 26,
    marginBottom: 100,
  },
});

/* 

const StyledView = styled.View`
  flex-direction: column;
  background-color: #d4d4f7;
  align-items: center;
  justify-content: center;
`; */
