import React from "react";
import { StyleSheet, View } from "react-native";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_TERTIARY
} from "../styles/common";
import TaskTile from "./TaskTile";
import { Title4 } from "./Title4";

export class EverydayTasksTile extends React.Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <Title4 style={styles.container}>EVERYDAY</Title4>
        <View>
          <View style={styles.tiles}>
            <TaskTile
              title={"AM"}
              tileType={1}
              navigation={this.props.navigation}
              type="Morning"
              icon="sunrise"
              color={COLOR_PRIMARY}
            />
            <TaskTile
              title={"NOON"}
              tileType={2}
              navigation={this.props.navigation}
              type="Day"
              icon="sun"
              color={COLOR_SECONDARY}
            />
            <TaskTile
              title={"PM"}
              tileType={3}
              navigation={this.props.navigation}
              type="Evening"
              icon="moon"
              color={COLOR_TERTIARY}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tiles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 110
  },
  container: {
    padding: 20
  },
  viewContainer: {
    marginBottom: 10
  }
});
