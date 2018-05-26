import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { connect } from "react-redux";
import { setActiveTaskType } from "../redux/reducers/tasks";
import { COLOR_PRIMARY } from "../styles/common";
import AnytimeTile from "./AnytimeTile";
import { Title2 } from "./Title2";
import { Title4 } from "./Title4";

class AnytimeTasksTile extends React.Component {
  onPressMoreTasks() {
    this.props.setActiveTaskType("Anytime");
    this.props.navigation.navigate("Search");
  }

  // TODO need algorithm to get tasks
  render() {
    return (
      <View style={styles.container}>
        <Title2>Recommended</Title2>
        <View>
          <AnytimeTile {...this.props} taskId={"4"} />
          <AnytimeTile {...this.props} taskId={"2"} />
          <AnytimeTile {...this.props} taskId={"5"} />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => this.onPressMoreTasks()}
            underlayColor="white"
          >
            <Title4 style={styles.link}>More Meditation Experiences</Title4>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  link: {
    color: COLOR_PRIMARY,
    fontWeight: "bold"
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveTaskType: type => dispatch(setActiveTaskType(type))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnytimeTasksTile);
