import React, { useContext } from "react";
import { LoginScreen } from "./src/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreens } from "./src/helpers/types";
import TabScreen from "./src/Screens/TabScreen";
import { AuthContext, AuthContextProvider } from "./src/contexts/AuthContext";
import RegisterScreen from "./src/Screens/RegisterScreen";
import ItemsProvider from "./src/contexts/ItemsContext";
import ItemDetailScreen from "./src/Screens/ItemDetailScreen";
import { setI18nConfig } from "./src/translation/translation";

export default function App() {
  setI18nConfig();

  return (
    <AuthContextProvider>
      <ItemsProvider>
        <MainNavigator />
      </ItemsProvider>
    </AuthContextProvider>
  );
}

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator<StackScreens>();
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {!authContext?.isUserSignedIn && (
          <>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
        {authContext?.isUserSignedIn && (
          <>
            <Stack.Screen
              name="ScreenWithTabs"
              component={TabScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ItemDetailScreen"
              component={ItemDetailScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
