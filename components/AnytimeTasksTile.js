import React from "react";
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setActiveTaskType } from "../redux/reducers/tasks";
import { getLeastUsedTasks } from "../redux/selectors";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../styles/common";
import AnytimeTile from "./AnytimeTile";
import { Title4 } from "./Title4";

class AnytimeTasksTile extends React.Component {
  onPressMoreTasks() {
    this.props.setActiveTaskType("Anytime");
    this.props.navigation.navigate("Search");
  }

  render() {
    const { leastUsedTasks } = this.props;
    return (
      <View style={styles.tile}>
        <Title4 style={styles.container}>TRY THESE</Title4>
        <FlatList
          style={styles.flatList}
          data={leastUsedTasks}
          renderItem={({ item }) => (
            <AnytimeTile
              {...this.props}
              focusType={
                !!item.premium && !this.props.premium
                  ? "Locked"
                  : item.focusType
              }
              taskId={item.id}
              listItem={item}
            />
          )}
        />
        <View style={styles.more}>
          <TouchableHighlight
            onPress={() => this.onPressMoreTasks()}
            underlayColor="white"
          >
            <Icon
              type="material"
              color={COLOR_SECONDARY}
              name="more-horiz"
              size={30}
            />
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
  },
  more: {
    alignItems: "flex-end",
    paddingLeft: 20,
    paddingRight: 20
  },
  flatList: {
    // borderTopColor: "gray",
    // borderTopWidth: 1
  },
  tile: {
    marginBottom: 20
  }
});

function mapStateToProps(state) {
  let tasks = getLeastUsedTasks(state).map(task => ({
    key: task.id,
    ...task
  }));
  return {
    premium: state.subscription.premium,
    leastUsedTasks: tasks
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
)(AnytimeTasksTile);
