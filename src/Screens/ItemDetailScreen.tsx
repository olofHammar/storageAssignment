import React, { useState, useEffect, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../helpers/types";
import { Picker } from "@react-native-picker/picker";
import { ItemsContext } from "../contexts/ItemsContext";
import { tokens } from "../translation/appStructur";
import { translate } from "../translation/translation";

interface IProps
  extends NativeStackScreenProps<StackScreens, "ItemDetailScreen"> {}

const ItemDetailScreen: React.FC<IProps> = (props) => {
  const params = props.route.params;
  const [name, setName] = useState(params.itemName);
  const [type, setType] = useState(params.itemType);
  const [price, setPrice] = useState(params.itemPrice);
  const [disabled, setDisabled] = useState(false);
  const { items, updateItem, saveItem, deleteItem } = useContext(ItemsContext);

  useEffect(() => {
    const priceNumber = Number(price);

    setDisabled(
      name.length === 0 ||
        priceNumber === 0 ||
        type.length == 0 ||
        priceNumber < 0
    );
  }, [name, price, type]);

  useEffect(() => {
    setName(params.itemName);
    setType(params.itemType);
    setPrice(params.itemPrice);
  }, []);

  const deleteDialog = () =>
    Alert.alert(
      translate(tokens.screens.itemDetailScreen.DeleteItem),
      translate(tokens.screens.itemDetailScreen.DeleteItemMsg),
      [
        {
          text: translate(tokens.screens.itemDetailScreen.CancelBtnText),
          style: "cancel",
        },
        {
          text: translate(tokens.screens.itemDetailScreen.DeleteBtnText),
          onPress: () => {
            deleteItem({
              id: params.itemId,
              name: name,
              price: Number(price),
              type: type,
            });
            props.navigation.goBack();
          },
        },
      ]
    );

  const checkItegratedPrice = (price: number): boolean => {
    if (price > 2600 || price < 1000) {
      return false;
    } else {
      return true;
    }
  };

  const handleInputError = (): string => {
    if (type == "Integrated" && !checkItegratedPrice(Number(price))) {
      return translate(tokens.screens.itemDetailScreen.AlertErrorMsg);
    } else {
      return "";
    }
  };

  const generateNewId = (): number => {
    const newId = Math.floor(Math.random() * 100);

    return newId;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {params.newItem && (
          <Text style={styles.userText}>
            {translate(tokens.screens.itemDetailScreen.CreateNewItem)}
          </Text>
        )}
        {!params.newItem && (
          <View style={styles.editItemTopContainer}>
            <Text style={styles.userText}>
              {translate(tokens.screens.itemDetailScreen.EditItem)}
            </Text>
            <TouchableOpacity onPress={deleteDialog}>
              <Feather name="trash-2" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={translate(
              tokens.screens.itemDetailScreen.NamePlaceHolder
            )}
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder={translate(tokens.screens.storageScreen.Price)}
            value={price}
            onChangeText={(text) => setPrice(text)}
            style={styles.input}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            style={styles.inputPicker}
          >
            <Picker.Item
              label={translate(tokens.screens.itemDetailScreen.SelectItemType)}
              value=""
            />
            <Picker.Item label="Peripheral" value="Peripheral" />
            <Picker.Item label="Integrated" value="Integrated" />
          </Picker>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonCancelContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>
                {translate(tokens.screens.itemDetailScreen.CancelBtnText)}
              </Text>
              <Foundation name="prohibited" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonSaveContainer,
                { backgroundColor: disabled ? "#AFE1AF" : "green" },
              ]}
              onPress={() => {
                if (!disabled) {
                  const checkErrors = handleInputError();
                  const itemExists = items.findIndex((n) => name === n.name);

                  if (checkErrors != "") {
                    alert(checkErrors);
                  } else {
                    if (params.newItem) {
                      saveItem({
                        id: generateNewId(),
                        name: name,
                        price: Number(price),
                        type: type,
                      });
                      props.navigation.goBack();
                    } else {
                      updateItem({
                        id: params.itemId,
                        name: name,
                        price: Number(price),
                        type: type,
                      });
                      props.navigation.goBack();
                    }
                  }
                } else {
                  alert("Enter all fields.");
                }
              }}
            >
              <Text style={styles.buttonText}>
                {translate(tokens.screens.itemDetailScreen.SaveBtnText)}
              </Text>
              <Feather name="download" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ItemDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 15,
    backgroundColor: "green",
  },
  editItemTopContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 12,
  },
  userText: {
    color: "white",
    fontSize: 27,
    fontWeight: "700",
    letterSpacing: 1.2,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: "15%",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 10,
  },
  inputPicker: {
    backgroundColor: "transparent",
    width: "80%",
    height: "30%",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "transparent",
    borderWidth: 0.5,
    marginTop: 40,
    marginBottom: 10,
  },
  buttonsContainer: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonSaveContainer: {
    backgroundColor: "green",
    color: "white",
    width: "40%",
    height: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 12,
    margin: 12,
    borderRadius: 4,
  },
  buttonCancelContainer: {
    backgroundColor: "gray",
    width: "40%",
    height: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 12,
    margin: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
