import React from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
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
        placeholderTextColor={COLOR_WHITE}
        style={[
          {
            borderColor: "gray",
            borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
            minHeight: 100,
            paddingBottom: 10,
            maxHeight: 100,
            height: 100
          },
          this.props.style
        ]}
        multiline={true}
        underlineColorAndroid={COLOR_WHITE}
        numberOfLines={5}
      />
    );
  }
}

const styles = StyleSheet.create({});
