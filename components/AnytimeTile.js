import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { startTask } from "../redux/reducers/tasks";
import { COLOR_WHITE } from "../styles/common";
import { FocusTypeIcon } from "./FocusTypeIcon";

class AnytimeTile extends React.Component {
  onPressStartTask(task) {
    this.props.startTask(task);
    this.props.navigation.navigate("DoTask"); // TODO change
  }

  render() {
    return !!this.props.task ? (
      <ListItem
        key={this.props.taskId}
        onPress={() => this.onPressStartTask(this.props.task)}
        title={this.props.task.title}
        avatar={<FocusTypeIcon focusType={this.props.task.focusType} />}
      />
    ) : (
      <View />
    );
  }
}

const getAvatarIconName = function(focusType) {
  if (focusType === "Smell") {
    return "more-horizontal";
  } else {
    return "ok";
  }
};

const styles = StyleSheet.create({
  dayTile: {
    height: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 32,
    height: 32
  },
  buttonText: {
    // padding: 20,
    color: COLOR_WHITE
  }
});

function mapStateToProps(state, props) {
  let storedTasks = state.tasks.tasks
    .map(task => ({ key: task.id, ...task }))
    .filter(task => task.id === props.taskId);
  return {
    task: storedTasks[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTask: type => dispatch(startTask(type))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnytimeTile);
