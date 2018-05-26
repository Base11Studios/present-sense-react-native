import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { cancelActiveTask } from "../redux/reducers/tasks";
import { COLOR_ALERT, COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";
import { MyText } from "./MyText";
import { Title2 } from "./Title2";

class CurrentTaskTile extends React.Component {
  onPressCompleteTask = selectedTask => {
    this.props.navigation.navigate("RecordingTask", { task: selectedTask });
  };

  onPressCancelTask = selectedTask => {
    this.props.cancelActiveTask();
  };

  render() {
    const { activeTask } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.currentTask}>
          <MyText>FINISH YOUR EXPERIENCE</MyText>
          <Title2>{activeTask.title}</Title2>
        </View>

        <View style={styles.buttonView}>
          <Button
            title="COMPLETE"
            color={COLOR_PRIMARY}
            onPress={() => this.onPressCompleteTask(activeTask)}
          />

          <Button
            title="CANCEL"
            color={COLOR_ALERT}
            onPress={() => this.onPressCancelTask()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    backgroundColor: COLOR_WHITE,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column"
  },
  buttonView: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    flex: 1
  },
  currentTask: {
    alignItems: "flex-start",
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    activeTask: state.tasks.activeTask
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelActiveTask: () => dispatch(cancelActiveTask())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTaskTile);
