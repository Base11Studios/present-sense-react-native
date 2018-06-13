import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { setActiveTaskType } from "../redux/reducers/tasks";
import { getNextTutorialTask } from "../redux/selectors";
import { COLOR_PRIMARY } from "../styles/common";
import { Title4 } from "./Title4";
import TutorialTile from "./TutorialTile";

class LearnHowTile extends React.Component {
  render() {
    const { task } = this.props;
    if (task !== null) {
      return (
        <View style={styles.tile}>
          <Title4 style={styles.container}>LEARN HOW</Title4>
          <FlatList
            data={[task]}
            renderItem={({ item }) => (
              <TutorialTile
                {...this.props}
                focusType={item.focusType}
                taskId={item.id}
                listItem={item}
              />
            )}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  link: {
    color: COLOR_PRIMARY,
    fontWeight: "bold"
  },
  tile: {
    marginBottom: 20
  }
});

function mapStateToProps(state) {
  let tutorialTask = getNextTutorialTask(state);
  if (tutorialTask !== null) {
    tutorialTask["key"] = "1";
  }
  return {
    task: tutorialTask
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveTaskType: type => dispatch(setActiveTaskType(type))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnHowTile);
