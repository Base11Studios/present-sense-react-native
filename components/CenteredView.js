import React from "react";
import { Text, StyleSheet, View } from "react-native";

export class CenteredView extends React.Component {
  render() {
    return <View {...this.props} style={styles.header} />;
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
