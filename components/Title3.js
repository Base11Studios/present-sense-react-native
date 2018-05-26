import React from "react";
import { MyText } from "./MyText";

export class Title3 extends React.Component {
  render() {
    return (
      <MyText
        {...this.props}
        style={[
          {
            fontSize: 18,
            fontWeight: "bold"
          },
          this.props.style
        ]}
      />
    );
  }
}
