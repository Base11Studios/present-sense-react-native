import React from "react";
import { View, StyleSheet } from "react-native";

export class PaddedContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
