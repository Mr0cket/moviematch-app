import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

// screens
import MyParty from "../screens/MyParty";
import MyAccount from "../screens/MyAccount";

const Account = createMaterialTopTabNavigator();

export default function AccountNavigator() {
  return (
    <Account.Navigator>
      <Account.Screen name="My Account" component={MyAccount} />
      <Account.Screen name="My Party" component={MyParty} />
    </Account.Navigator>
  );
}
