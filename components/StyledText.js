import React from "react";
import { MyText } from "./MyText";

export class MonoText extends React.Component {
  render() {
    return (
      <MyText
        {...this.props}
        style={[this.props.style, { fontFamily: "space-mono" }]}
      />
    );
  }
}
