import React from "react";
import { Text } from "react-native";
import { Button } from "react-native";
import { COLOR_PRIMARY } from "../styles/common";

export class PrimaryButton extends React.Component {
  render() {
    return (
      <Button
        {...this.props}
        containerViewStyle={{ width: "100%", marginLeft: 0 }}
      />
    );
  }
}
