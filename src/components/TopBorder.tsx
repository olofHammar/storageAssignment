import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FormatTopBorderProps {
  title: string;
}

const TopBorder = ({ title }: FormatTopBorderProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.userText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "green",
  },
  bottomContainer: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    letterSpacing: 1.2,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  userText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginTop: 40,
    paddingHorizontal: 12,
  },
  typeText: {
    fontWeight: "bold",
  },
});

export default TopBorder;
