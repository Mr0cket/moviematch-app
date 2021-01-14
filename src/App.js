import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reduxStore from "./store";
// screens

import React, { useEffect, useRef } from "react";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import { Provider, useSelector } from "react-redux";
import Navigation from "./navigation";

export default function App() {
  const systemTheme = useColorScheme();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        return token;
      } catch (error) {
        console.log(error);
      }
    };
    // dispatch(gotToken)
  }, []);
  return (
    <Provider store={reduxStore}>
      <Navigation />
      <StatusBar />
    </Provider>
  );
}
/* Need to figure out how this works */
/* Add this later to get rid of the stupid header */

/*
 */
