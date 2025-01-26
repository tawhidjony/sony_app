import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const RNActivityIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating />
    </View>
  );
};

export default RNActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
