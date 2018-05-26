import React from "react";
import { TextWithLetterSpacing } from "./TextWithLetterSpacing";

export class Title4 extends React.Component {
  render() {
    return (
      <TextWithLetterSpacing
        {...this.props}
        textStyle={[
          {
            fontSize: 15,
            fontWeight: "400"
          },
          this.props.textStyle
        ]}
        viewStyle={this.props.style}
        spacing={2}
      />
    );
  }
}
