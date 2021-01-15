import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Tab Icons
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// screens / sub-Navigators
import DiscoverMovies from "../screens/DiscoverMovies";
import AccountNavigator from "./AccountNavigator";

const MainTabs = createMaterialTopTabNavigator();

export default function MainTabsNavigator() {
  return (
    <MainTabs.Navigator
      initialRouteName="Discover"
      tabBarOptions={{ activeTintColor: "blue", inactiveTintColor: "black", showIcon: true }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Discover") {
            return focused ? (
              <FontAwesome name="search" size={24} color="black" />
            ) : (
              <AntDesign name="search1" size={24} color="black" />
            );
          }
          if (route.name === "Account") {
            return focused ? (
              <Ionicons name="person-circle-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="person-circle-outline" size={24} color="black" />
            );
          }
        },
      })}
    >
      <MainTabs.Screen name="Account" component={AccountNavigator} />
      <MainTabs.Screen name="Discover" component={DiscoverMovies} />
    </MainTabs.Navigator>
  );
}
/* function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
} */

/*         options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }} */
/* function TabBarIcon({ name, color }) {
  console.log("props:", props);
  return <MaterialCommunityIcons size={24} name={name} color={color} />;
} */

/* function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
} */

/* {
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="movie-search-outline" color={color} />
          ),
        } */
