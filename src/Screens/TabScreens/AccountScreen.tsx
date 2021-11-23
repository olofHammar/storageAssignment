import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Auth } from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { tokens } from "../../translation/appStructur";
import { translate } from "../../translation/translation";
import TopBorder from "../../components/TopBorder";

const AccountScreen = () => {
  const auth = Auth();
  const authContext = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <TopBorder
        title={translate(tokens.screens.accountScreen.AccountBorderTitle)}
      />
      <View style={styles.buttonContainer}>
        <Text>{`${translate(
          tokens.screens.accountScreen.CurrentUser
        )}: ${String(auth.currentUser?.email)}`}</Text>
        <TouchableOpacity
          onPress={() => {
            authContext?.logout();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {translate(tokens.screens.accountScreen.SignOutBtnText)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    height: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
