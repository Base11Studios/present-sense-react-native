import React from "react";
import { StyleSheet, View } from "react-native";
import { getFocusTypeColor } from "../constants/Helpers";
import { FocusTypeIcon } from "./FocusTypeIcon";
import { MyText } from "./MyText";
import { Title4 } from "./Title4";

export class FocusBadge extends React.Component {
  render() {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          },
          this.props.style
        ]}
      >
        <Title4>FOCUS</Title4>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <MyText
            style={{
              color: getFocusTypeColor(this.props.focusType),
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
