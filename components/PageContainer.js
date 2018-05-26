import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { COLOR_WHITE } from "../styles/common";

export class PageContainer extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <View {...this.props} style={[styles.container, this.props.style]} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLOR_WHITE
  }
});
