import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from '@react-navigation/stack';

// screens
import MyParty from "../screens/MyParty";
import MyAccount from "../screens/MyAccount";
import SetLocale from "../screens/MyAccount/SetLocale";

const Account = createMaterialTopTabNavigator()

export default function AccountNavigator () {
  return (
    <Account.Navigator>
      <Account.Screen name="Account" component={SettingsNavigator} />
      <Account.Screen name="Party" component={MyParty} />
    </Account.Navigator>
  )
}

const Settings = createStackNavigator()

function SettingsNavigator () {
  return (
    <Settings.Navigator mode="modal" headerMode="none">
      <Settings.Screen name="Account" component={MyAccount} />
      <Settings.Screen name="SetLocale" component={SetLocale} />
    </Settings.Navigator>
  )
}
