import React from "react";
import { Text } from "react-native";
import { COLOR_BLACK } from "../styles/common";

export class MyText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          {
            color: COLOR_BLACK
          },
          this.props.style
        ]}
      />
    );
  }
}
