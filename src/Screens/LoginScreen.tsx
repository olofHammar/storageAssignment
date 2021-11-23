import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { StackScreens } from "../helpers/types";
import { AuthContext } from "../contexts/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { tokens } from "../translation/appStructur";
import { translate } from "../translation/translation";

export const LoginScreen: React.FC<
  NativeStackScreenProps<StackScreens, "LoginScreen">
> = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setDisabled(email.length === 0 || password.length === 0);
  }, [email, password]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={translate(
            tokens.screens.loginScreen.LoginEmailPlaceholder
          )}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder={translate(
            tokens.screens.loginScreen.LoginPasswordPlaceholder
          )}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            authContext?.login(email, password);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {translate(tokens.screens.loginScreen.LoginBtnText)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("RegisterScreen");
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {translate(tokens.screens.loginScreen.RegisterBtnText)}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 10,
    borderColor: "green",
    borderWidth: 2,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  buttonOutlineText: {
    color: "green",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
