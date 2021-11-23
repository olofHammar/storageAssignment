import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { FAB } from "react-native-paper";
import TopBorder from "../../components/TopBorder";
import ItemContainer from "../../components/ItemContainer";
import { StackScreens } from "../../helpers/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ItemsContext } from "../../contexts/ItemsContext";
import { Item } from "../../helpers/types";
import { tokens } from "../../translation/appStructur";
import { translate } from "../../translation/translation";

const StorageScreen: React.FC<
  NativeStackScreenProps<StackScreens, "ScreenWithTabs">
> = (props) => {
  const { items } = useContext(ItemsContext);

  const itemsList = ({ item }: { item: Item }) => {
    return (
      <ItemContainer
        item={item}
        onClick={() => {
          props.navigation.navigate("ItemDetailScreen", {
            newItem: false,
            itemId: item.id,
            itemName: item.name,
            itemType: item.type,
            itemPrice: String(item.price),
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBorder
        title={translate(tokens.screens.storageScreen.StorageBorderTitle)}
      />
      {items.length > 0 && (
        <FlatList
          data={items}
          renderItem={itemsList}
          keyExtractor={(item) => item.id.toString()}
          style={styles.itemContainer}
        />
      )}
      {items.length == 0 && (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>
            {translate(tokens.screens.storageScreen.EmptyStorageMsg)}
          </Text>
        </View>
      )}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => {
          props.navigation.navigate("ItemDetailScreen", {
            newItem: true,
            itemId: -1,
            itemName: "",
            itemType: "",
            itemPrice: "",
          });
        }}
      />
    </SafeAreaView>
  );
};

export default StorageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
    paddingVertical: 20,
  },
  emptyListContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    marginTop: 30,
  },
  emptyListText: {
    padding: 12,
    letterSpacing: 1.2,
    fontSize: 20,
  },
  itemContainer: {
    width: "100%",
    height: "100%",
  },
  itemTextStart: {
    flex: 1,
  },
  itemTextCenter: {
    flex: 1,
    textAlign: "center",
  },
  itemTextEnd: {
    flex: 1,
    textAlign: "right",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
  },
});
