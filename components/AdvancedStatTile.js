import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  getMindTasksCompleted,
  getSightTasksCompleted,
  getSmellTasksCompleted,
  getSoundTasksCompleted,
  getTasteTasksCompleted,
  getTouchTasksCompleted
} from "../redux/selectors/index";
import { COLOR_WHITE } from "../styles/common";
import { FocusTypeIcon } from "./FocusTypeIcon";
import { MyText } from "./MyText";

class StatTile extends React.Component {
  render() {
    const {
      mindTasksCompleted,
      smellTasksCompleted,
      tasteTasksCompleted,
      sightTasksCompleted,
      soundTasksCompleted,
      touchTasksCompleted
    } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.stat}>
          <FocusTypeIcon focusType={"Taste"} />
          <MyText style={styles.statText}>{tasteTasksCompleted}</MyText>
        </View>
        <View style={styles.stat}>
          <FocusTypeIcon focusType={"Sound"} />
          <MyText style={styles.statText}>{soundTasksCompleted}</MyText>
        </View>
        <View style={styles.stat}>
          <FocusTypeIcon focusType={"Smell"} />
          <MyText style={styles.statText}>{smellTasksCompleted}</MyText>
        </View>
        <View style={styles.stat}>
          <FocusTypeIcon focusType={"Touch"} />
          <MyText style={styles.statText}>{touchTasksCompleted}</MyText>
        </View>
        <View style={styles.stat}>
          <FocusTypeIcon focusType={"Sight"} />
          <MyText style={styles.statText}>{sightTasksCompleted}</MyText>
        </View>
        <View style={styles.stat}>
          <FocusTypeIcon focusType={"Mind"} />
          <MyText style={styles.statText}>{mindTasksCompleted}</MyText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  stat: {
    flex: 1,
    alignItems: "center"
  },
  statText: {
    marginTop: 4,
    fontSize: 19,
    fontWeight: "400",
    color: COLOR_WHITE
  }
});

function mapStateToProps(state) {
  return {
    mindTasksCompleted: getMindTasksCompleted(state),
    smellTasksCompleted: getSmellTasksCompleted(state),
    tasteTasksCompleted: getTasteTasksCompleted(state),
    sightTasksCompleted: getSightTasksCompleted(state),
    soundTasksCompleted: getSoundTasksCompleted(state),
    touchTasksCompleted: getTouchTasksCompleted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatTile);
