import React from "react";
import { MyText } from "./MyText";

export class Title extends React.Component {
  render() {
    return (
      <MyText
        {...this.props}
        style={[
          {
            fontSize: 30,
            fontWeight: "bold"
          },
          this.props.style
        ]}
      />
    );
  }
}
