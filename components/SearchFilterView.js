import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { COLOR_WHITE } from "../styles/common";

export default class SearchFilterView extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.dayFilter,
          this.props.activeTaskType === this.props.filterType
            ? { backgroundColor: this.props.color }
            : { backgroundColor: COLOR_WHITE }
        ]}
      >
        {this.props.icon === "am" ? (
          <Image
            style={styles.avatar}
            source={require("../assets/images/am.png")}
          />
        ) : this.props.icon === "pm" ? (
          <Image
            style={styles.avatar}
            source={require("../assets/images/pm.png")}
          />
        ) : this.props.icon === "anytime" ? (
          <Image
            style={styles.avatar}
            source={require("../assets/images/anytime.png")}
          />
        ) : (
          <Image
            style={styles.avatar}
            source={require("../assets/images/noon.png")}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60
  },
  dayFilter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
