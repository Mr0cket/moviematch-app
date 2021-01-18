import React, { useRef } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useReduxDevToolsExtension } from "@react-navigation/devtools";
import { useSelector } from "react-redux";

// screens
import MainTabsNavigator from "./MainTabs";
import Modal from "../screens/Modal";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import NotFoundScreen from "../screens/NotFound";
import useToken from "../hooks/useToken";
import { appLoading } from "../store/appState/actions";

// create navigator
const RootStack = createStackNavigator();

export default function Navigation() {
  const userToken = useToken();
  const navigationRef = useRef();
  // theme={systemTheme === "dark" ? DarkTheme : DefaultTheme}
  useReduxDevToolsExtension(navigationRef);

  // get AppState from store
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator /* headerMode="none"|"float"|"screen" */>
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
            {/* https://reactnavigation.org/docs/screen#children */}
            <RootStack.Screen name="Main">
              {(props) => <MainTabsNavigator {...props} userToken={userToken} />}
            </RootStack.Screen>
            <RootStack.Screen
              name="notificationModal"
              component={Modal}
              // options={{ headerShown: false }}
            />
          </>
        )}
        <RootStack.Screen name="NotFound" component={NotFoundScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
