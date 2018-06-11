import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLOR_WHITE } from "../styles/common";

export class AutoExpandingTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", height: 50 };
  }
  render() {
    return (
      <TextInput
        {...this.props}
        placeholder={"Enter Response"}
        style={[
          {
            borderColor: "gray",
            borderBottomWidth: 1,
            minHeight: 40,
            paddingBottom: 10,
            maxHeight: 100
          },
          this.props.style
        ]}
        multiline={true}
        underlineColorAndroid={COLOR_WHITE}
        numberOfLines={2}
      />
    );
  }
}

const styles = StyleSheet.create({});
