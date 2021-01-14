import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

// Tab Icons
import { Ionicons } from "@expo/vector-icons";

// screens / sub-Navigators
import DiscoverMovies from "../screens/DiscoverMovies";
import AccountNavigator from "./AccountNavigator";

const MainTabs = createMaterialTopTabNavigator();

export default function MainTabsNavigator() {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name="Discover"
        component={DiscoverMovies}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={30} style={{ marginBottom: -3 }} name="ios-code" color={color} />
          ),
        }}
      />
    </MainTabs.Navigator>
  );
}

{
  /* <MainTabs.Screen name="Account" component={AccountNavigator} /> */
}
/* function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
} */
