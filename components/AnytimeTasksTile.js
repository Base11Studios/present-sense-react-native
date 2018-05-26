import React from "react";
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setActiveTaskType } from "../redux/reducers/tasks";
import { COLOR_PRIMARY } from "../styles/common";
import AnytimeTile from "./AnytimeTile";
import { Title4 } from "./Title4";

class AnytimeTasksTile extends React.Component {
  onPressMoreTasks() {
    this.props.setActiveTaskType("Anytime");
    this.props.navigation.navigate("Search");
  }

  tasks = [
    { taskId: "1", key: "1", title: "Brush Your Teeth" },
    { taskId: "2", key: "2", title: "Brush Your Teeth" },
    { taskId: "3", key: "3", title: "Brush Your Teeth" }
  ];

  render() {
    return (
      <View style={styles.tile}>
        <Title4 style={styles.container}>ANYTIME</Title4>
        <FlatList
          style={styles.flatList}
          data={this.tasks}
          renderItem={({ item }) => (
            <AnytimeTile {...this.props} taskId={item.taskId} listItem={item} />
          )}
        />
        <View style={styles.more}>
          <TouchableHighlight
            onPress={() => this.onPressMoreTasks()}
            underlayColor="white"
          >
            <Icon name="more-horizontal" size={30} />
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
    borderTopColor: "gray",
    borderTopWidth: 1
  },
  tile: {
    marginBottom: 20
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
