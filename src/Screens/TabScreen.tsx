import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { TabScreens } from "../helpers/types";
import StorageScreen from "./TabScreens/StorageScreen";
import AccountScreen from "./TabScreens/AccountScreen";

const TabScreen = () => {
  const TabsNavigation = createBottomTabNavigator<TabScreens>();
  return (
    <TabsNavigation.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarStyle: { backgroundColor: "black" },
      }}
    >
      <TabsNavigation.Screen
        name="Storage"
        component={StorageScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="storage"
                color={focused ? "white" : "grey"}
                size={30}
              />
            );
          },
        }}
      />
      <TabsNavigation.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="account-circle"
                color={focused ? "white" : "grey"}
                size={30}
              />
            );
          },
        }}
      />
    </TabsNavigation.Navigator>
  );
};

export default TabScreen;

const styles = StyleSheet.create({});
