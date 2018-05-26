import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Colors from "../constants/Colors";
import { COLOR_BLACK } from "../styles/common";
// TODO if iOS, wrap with touch hightlight, if android wrap with https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472

export class DismissButton extends React.Component {
  render() {
    return (
      <Icon
        name={Platform.OS === "ios" ? "ios-close" : "md-close"}
        size={Platform.OS === "ios" ? 35 : 24}
        color={Platform.OS === "ios" ? Colors.tintColor : COLOR_BLACK}
        style={
          Platform.OS === "ios"
            ? { marginBottom: -4, width: 25, marginRight: 9 }
            : { marginBottom: -4, width: 25, marginRight: 20 }
        }
        onPress={() => {
          if (!!this.props.reset) {
            this.props.navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: this.props.resetRoute,
                    params: {}
                  })
                ]
              })
            );
          }

          this.props.navigation.dispatch(NavigationActions.back());
        }}
      />
    );
  }
}
