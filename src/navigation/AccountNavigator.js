import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

// screens
import Party from "../screens/Party";

const Account = createMaterialTopTabNavigator();

export default function AccountNavigator() {
  return (
    <Account.Navigator>
      <Account.Screen name="Party" component={Party} />
    </Account.Navigator>
  );
}
