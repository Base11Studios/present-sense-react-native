import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR_WHITE } from "../styles/common";
import { FocusTypeIcon } from "./FocusTypeIcon";
import { MyText } from "./MyText";

export class FocusBadge extends React.Component {
  render() {
    return (
      <View
        style={[
          {
            paddingTop: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          },
          this.props.style
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <MyText
            style={{
              color: COLOR_WHITE,
              fontSize: 14,
              fontWeight: "800",
              marginRight: 10
            }}
          >
            {this.props.focusType.toUpperCase()}
          </MyText>
          <FocusTypeIcon
            style={styles.focusType}
            focusType={this.props.focusType}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  focusType: {
    width: 24,
    height: 24
  }
});
