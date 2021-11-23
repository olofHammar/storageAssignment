import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, IconButton, Paragraph } from "react-native-paper";
import { Item } from "../helpers/types";
import { tokens } from "../translation/appStructur";
import { translate } from "../translation/translation";

interface FormatItemProps {
  item: Item;
}

interface IItemComponent extends FormatItemProps {
  onClick: () => void;
}

export const ItemContainer: React.FC<IItemComponent> = (props) => {
  return (
    <Card.Title
      style={styles.card}
      titleStyle={{ textAlign: "left" }}
      title={
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View>
            <Text style={styles.cardTitle}>{props.item.name}</Text>
            <Paragraph style={styles.cardSubtitle}>{`${translate(
              tokens.screens.storageScreen.ItemType
            )}: ${props.item.type}`}</Paragraph>
            <Paragraph style={styles.cardSubtitle}>{`${translate(
              tokens.screens.storageScreen.Price
            )}: $${props.item.price}`}</Paragraph>
          </View>
          <View style={{ flexGrow: 1 }} />
        </View>
      }
      right={() => (
        <IconButton
          icon="square-edit-outline"
          onPress={props.onClick}
          size={40}
        />
      )}
    >
      <Text style={{ marginBottom: 10 }}>{props.item.name}</Text>
    </Card.Title>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 4,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  cardTitle: {
    letterSpacing: 1.2,
    fontSize: 25,
    fontWeight: "bold",
  },
  cardSubtitle: {
    letterSpacing: 1.2,
    fontSize: 14,
    fontWeight: "normal",
    marginVertical: 0,
  },
});

export default ItemContainer;
