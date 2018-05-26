import React from "react";
import { MyText } from "./MyText";

export class Title2 extends React.Component {
  render() {
    return (
      <MyText
        {...this.props}
        style={[
          {
            fontSize: 24,
            fontWeight: "200"
          },
          this.props.style
        ]}
      />
    );
  }
}
