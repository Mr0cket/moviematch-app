import React, { useRef } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useReduxDevToolsExtension } from "@react-navigation/devtools";
import { selectToken } from "../store/user/selectors";
import MainTabsNavigator from "./MainTabs";
import Modal from "../screens/Modal";
import { useSelector } from "react-redux";
const RootStack = createStackNavigator();

// screens
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import NotFoundScreen from "../screens/NotFound";

export default function Navigation() {
  const token = useSelector(selectToken);
  const userToken = "abc";
  const navigationRef = useRef();
  // theme={systemTheme === "dark" ? DarkTheme : DefaultTheme}
  useReduxDevToolsExtension(navigationRef);
  console.log(userToken);
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
