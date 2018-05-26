import React from "react";
import { COLOR_ALERT } from "../styles/common";
import { MyText } from "./MyText";

export class ErrorText extends React.Component {
  render() {
    return (
      <MyText
        {...this.props}
        style={[
          this.props.style,
          {
            fontSize: 14,
            fontWeight: "bold",
            color: COLOR_ALERT
          }
        ]}
      />
    );
  }
}
