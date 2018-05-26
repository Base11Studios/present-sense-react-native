import React from "react";
import { MyText } from "./MyText";

export class Title5 extends React.Component {
  render() {
    return (
      <MyText
        {...this.props}
        style={[
          {
            fontSize: 14,
            fontWeight: "bold"
          },
          this.props.style
        ]}
      />
    );
  }
}
