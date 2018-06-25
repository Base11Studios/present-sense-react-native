import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { getBackgroundColorByDay } from "../constants/Helpers";
import { startTask } from "../redux/reducers/tasks";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";
import { FocusTypeIcon } from "./FocusTypeIcon";
import { MyText } from "./MyText";

class AnytimeTile extends React.Component {
  onPressStartTask(task) {
    if (!!task.premium && !this.props.premium) {
      this.props.navigation.navigate("Subscribe");
    } else {
      this.props.startTask(task);
      this.props.navigation.navigate("ViewTask");
    }
  }

  render() {
    return !!this.props.task ? (
      <TouchableOpacity
        key={this.props.taskId}
        onPress={() => this.onPressStartTask(this.props.task)}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: getBackgroundColorByDay(this.props.task.type) }
          ]}
        >
          <FocusTypeIcon
            style={styles.avatar}
            focusType={this.props.focusType}
          />
          <View style={{ alignItems: "center", flex: 1 }}>
            <MyText
              style={{
                color: COLOR_WHITE,
                fontSize: 18,
                fontWeight: "600",
                marginRight: 28
              }}
            >
              {this.props.task.title}
            </MyText>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  dayTile: {
    height: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    marginLeft: 16
  },
  buttonText: {
    // padding: 20,
    color: COLOR_WHITE
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 8,
    borderRadius: 6,
    backgroundColor: COLOR_PRIMARY,
    flexDirection: "row",
    alignItems: "center"
  }
});

function mapStateToProps(state, props) {
  let storedTasks = state.tasks.tasks
    .map(task => ({ key: task.id, ...task }))
    .filter(task => task.id === props.taskId);
  return {
    task: storedTasks[0],
    premium: state.subscription.premium
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTask: type => dispatch(startTask(type))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnytimeTile);
