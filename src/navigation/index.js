import React, { useEffect, useRef } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useReduxDevToolsExtension } from "@react-navigation/devtools";
import { selectToken } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "../store/user/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

// screens
import MainTabsNavigator from "./MainTabs";
import Modal from "../screens/Modal";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import NotFoundScreen from "../screens/NotFound";
import useToken from "../hooks/useToken";

// create navigator
const RootStack = createStackNavigator();

export default function Navigation({ systemTheme }) {
  const userToken = useToken();
  console.log("userToken:", userToken);

  const navigationRef = useRef();
  // theme={systemTheme === "dark" ? DarkTheme : DefaultTheme}
  useReduxDevToolsExtension(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        {!userToken ? (
          <>
            <RootStack.Screen
              name="SignIn"
              options={{
                title: "Sign In",
              }}
              component={SignInScreen}
            />
            <RootStack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: "Sign Up",
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen name="Main" component={MainTabsNavigator} />
            <RootStack.Screen name="notificationModal" component={Modal} />
          </>
        )}
        <RootStack.Screen name="NotFound" component={NotFoundScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
