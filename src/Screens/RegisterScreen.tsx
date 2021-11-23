import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../helpers/types";
import { AuthContext } from "../contexts/AuthContext";
import { tokens } from "../translation/appStructur";
import { translate } from "../translation/translation";

const RegisterScreen: React.FC<
  NativeStackScreenProps<StackScreens, "RegisterScreen">
> = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(email, password, repeatPassword, password !== repeatPassword);
    setDisabled(
      email.length === 0 ||
        password.length === 0 ||
        repeatPassword.length === 0 ||
        password !== repeatPassword
    );
  }, [email, password, repeatPassword]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={translate(
            tokens.screens.loginScreen.LoginEmailPlaceholder
          )}
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          placeholder={translate(
            tokens.screens.loginScreen.LoginPasswordPlaceholder
          )}
          style={styles.input}
          onChangeText={setPassword}
        />
        <TextInput
          secureTextEntry
          placeholder={translate(
            tokens.screens.registerScreen.RepeatPasswordPlaceholder
          )}
          style={styles.input}
          onChangeText={setRepeatPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={async () => {
            if (!disabled) {
              await authContext?.register(email, password);
              props.navigation.goBack();
            } else {
              alert("Enter all fields.");
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {translate(tokens.screens.loginScreen.RegisterBtnText)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("LoginScreen");
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {translate(tokens.screens.registerScreen.BackBtnText)}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
