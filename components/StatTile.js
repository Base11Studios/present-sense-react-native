import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { getTasksPerDay, getTaskStreak, getTotalTasksCompleted } from "../redux/selectors/index";
import { COLOR_WHITE } from "../styles/common";
import { MyText } from "./MyText";

class StatTile extends React.Component {
  render() {
    const { totalTasksCompleted, taskStreak, tasksPerDay } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            style={styles.avatar}
            source={require("../assets/images/user_profile.png")}
          />
        </View>
        <View style={styles.stat}>
          <MyText style={styles.statText}>{totalTasksCompleted}</MyText>
          <MyText style={styles.statLabel}>MINDFUL{'\n'}EXPERIENCES</MyText>
        </View>
        <View style={styles.stat}>
          <MyText style={styles.statText}>{taskStreak}</MyText>
          <MyText style={styles.statLabel}>DAY{'\n'}STREAK</MyText>
        </View>
        <View style={styles.stat}>
          <MyText style={styles.statText}>{tasksPerDay.toFixed(1)}</MyText>
          <MyText style={styles.statLabel}>M.E.{'\n'}/ DAY</MyText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // height: 110,
    backgroundColor: COLOR_WHITE,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },
  avatar: {
    width: 60,
    height: 60
  },
  profile: {
    width: 76,
    justifyContent: "flex-start",
    alignItems: "center",
    height: 75
  },
  stat: {
    flex: 1,
    alignItems: "center"
  },
  statText: {
    fontSize: 28,
    fontWeight: "600"
  },
  statLabel: {
    textAlign: "center",
    // height: 36,
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4
  }
});

function mapStateToProps(state) {
  return {
    totalTasksCompleted: getTotalTasksCompleted(state),
    taskStreak: getTaskStreak(state),
    tasksPerDay: getTasksPerDay(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatTile);
