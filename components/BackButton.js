import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../constants/Colors";
import { COLOR_BLACK } from "../styles/common";

// TODO if iOS, wrap with touch hightlight, if android wrap with https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
export class BackButton extends React.Component {
  render() {
    return (
      <Icon
        name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
        size={Platform.OS === "ios" ? 35 : 24}
        color={Platform.OS === "ios" ? Colors.tintColor : COLOR_BLACK}
        style={
          Platform.OS === "ios"
            ? { marginBottom: -4, width: 25, marginLeft: 9 }
            : { marginBottom: -4, width: 25, marginLeft: 20 }
        }
        type="ionicon"
        onPress={() => {
          this.props.navigation.goBack();
        }}
      />
    );
  }
}
