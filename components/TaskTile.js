import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { connect } from "react-redux";
import { setActiveTaskType } from "../redux/reducers/tasks";
import { COLOR_WHITE } from "../styles/common";

class TaskTile extends React.Component {
  onPressTaskTile(type) {
    this.props.setActiveTaskType(type);
    this.props.navigation.navigate("Search");
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.onPressTaskTile(this.props.type)}
        underlayColor="white"
      >
        <View style={styles.dayTile}>
          {this.props.icon === "am" ? (
            <Image
              style={styles.avatar}
              source={require("../assets/images/am.png")}
            />
          ) : this.props.icon === "pm" ? (
            <Image
              style={styles.avatar}
              source={require("../assets/images/pm.png")}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require("../assets/images/noon.png")}
            />
          )}
          {/* <MyText style={styles.dayFilterText}>{this.props.type}</MyText> */}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  dayTile: {
    height: 80,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    height: 80,
    width: 80
  },
  buttonText: {
    // padding: 20,
    color: COLOR_WHITE
  },
  dayFilterText: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "600"
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskTile);
