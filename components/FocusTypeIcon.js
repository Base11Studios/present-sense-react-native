import React from "react";
import { Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { COLOR_BLACK } from "../styles/common";

export class FocusTypeIcon extends React.Component {
  render() {
    return this.props.focusType === "Sound" ? (
      <Image
        style={[styles.avatar, this.props.style]}
        source={require("../assets/images/hear.png")}
      />
    ) : this.props.focusType === "Sight" ? (
      <Image
        style={[styles.avatar, this.props.style]}
        source={require("../assets/images/sight.png")}
      />
    ) : this.props.focusType === "Touch" ? (
      <Image
        style={[styles.avatar, this.props.style]}
        source={require("../assets/images/touch.png")}
      />
    ) : this.props.focusType === "Smell" ? (
      <Image
        style={[styles.avatar, this.props.style]}
        source={require("../assets/images/smell.png")}
      />
    ) : this.props.focusType === "Taste" ? (
      <Image
        style={[styles.avatar, this.props.style]}
        source={require("../assets/images/taste.png")}
      />
    ) : this.props.focusType === "Mind" ? (
      <Image
        style={[styles.avatar, this.props.style]}
        source={require("../assets/images/mind.png")}
      />
    ) : this.props.focusType === "Locked" ? (
      <Icon
        type="font-awesome"
        name="lock"
        size={26}
        containerStyle={{ padding: 7 }}
        color={COLOR_BLACK}
      />
    ) : (
      ""
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32
  }
});
