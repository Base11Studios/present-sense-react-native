import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { startTask } from "../redux/reducers/tasks";
import { COLOR_PRIMARY, COLOR_TERTIARY, COLOR_WHITE } from "../styles/common";
import { MyText } from "./MyText";

class TutorialTile extends React.Component {
  onPressStartTask(task) {
    this.props.startTask(task);
    this.props.navigation.navigate("TutorialHelper1", { number: 1 });
  }

  render() {
    return !!this.props.task ? (
      <TouchableOpacity
        key={this.props.taskId}
        onPress={() => this.onPressStartTask(this.props.task)}
      >
        <View style={[styles.card, { backgroundColor: COLOR_TERTIARY }]}>
          <Icon
            type="simple-line-icon"
            name="book-open"
            size={28}
            containerStyle={[
              { paddingTop: 9, paddingBottom: 4, paddingHorizontal: 9 },
              this.props.style
            ]}
            color={COLOR_WHITE}
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
  avatar: {
    width: 32,
    height: 32
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
)(TutorialTile);
