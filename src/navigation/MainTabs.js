import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initSocket } from "../store/socket";

// Tab Icons
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

// screens / sub-Navigators
import DiscoverMovies from "../screens/DiscoverMovies";
import AccountNavigator from "./AccountNavigator";
import Matches from "../screens/Matches";
import LikedMovies from "../screens/LikedMovies";

const MainTabs = createMaterialTopTabNavigator();

export default function MainTabsNavigator({ userToken }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // send socket the token to show what user this is.
    // socket then gets the user from database.
    initSocket(userToken, dispatch);
  }, []);

  /* Navigator Props 
  showLabel={true/false}
  tabBarBadge
  swipeEnabled={true/false} => behaviour when swiping the tab left/right 
  */
  return (
    <MainTabs.Navigator
      initialRouteName="Discover"
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "black",
        showIcon: true,
        showLabel: false,
      }}
      // screenOptions={{}}
    >
      <MainTabs.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="person-circle-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="person-circle-outline" size={24} color="black" />
            ),
        }}
      />
      <MainTabs.Screen
        name="Discover"
        component={DiscoverMovies}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <FontAwesome name="search" size={24} color="black" />
            ) : (
              <AntDesign name="search1" size={24} color="black" />
            ),
        }}
      />
      <MainTabs.Screen
        name="Matches"
        component={Matches}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MaterialIcons name="video-library" size={24} color="black" />
            ) : (
              <MaterialIcons name="video-library" size={24} color="black" />
            ),
        }}
      />
      <MainTabs.Screen
        name="LikedMovies"
        component={LikedMovies}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MaterialIcons name="video-library" size={24} color="black" />
            ) : (
              <MaterialIcons name="video-library" size={24} color="black" />
            ),
        }}
      />
    </MainTabs.Navigator>
  );
}
