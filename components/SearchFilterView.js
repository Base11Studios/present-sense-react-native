import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { COLOR_BLACK, COLOR_WHITE } from "../styles/common";
import { MyText } from "./MyText";

export default class SearchFilterView extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.dayFilter,
          this.props.activeTaskType === this.props.filterType
            ? { backgroundColor: this.props.color }
            : {}
        ]}
      >
        <Icon
          type="feather"
          name={this.props.iconName}
          size={30}
          color={
            this.props.activeTaskType === this.props.filterType
              ? COLOR_WHITE
              : COLOR_BLACK
          }
          style={[styles.icon]}
        />
        <MyText
          style={[
            styles.dayFilterText,
            this.props.activeTaskType === this.props.filterType
              ? { color: COLOR_WHITE }
              : {}
          ]}
        >
          {this.props.filterType}
        </MyText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayFilterText: {
    marginTop: 8,
    textAlign: "center"
  },
  icon: {
    marginTop: 4
  },
  dayFilter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
