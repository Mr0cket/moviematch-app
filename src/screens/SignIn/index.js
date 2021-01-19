import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user/actions";
import Button from "../../components/Button";
import { selectMessage } from "../../store/appState/selectors";
import Container from "../../components/Container";
export default function SignIn({ navigation }) {
  // console.log("systemTheme:", systemTheme);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginError = useSelector(selectMessage);
  console.log("loginError:", loginError);
  return (
    <Container style={styles.container}>
      <Text>{loginError && loginError}</Text>
      <TextInput onChangeText={setEmail} style={styles.input} placeholder="email" />
      <TextInput
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="password"
      />
      <Button
        text="login"
        onPress={() => dispatch(login(email, password))}
        style={{ backgroundColor: "rgb(245, 201, 72)" }}
      />

      <Button
        text="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
        style={{ backgroundColor: "rgb(245, 201, 72)" }}
      ></Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
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
