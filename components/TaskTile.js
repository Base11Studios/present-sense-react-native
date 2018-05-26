import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setActiveTaskType } from "../redux/reducers/tasks";
import { COLOR_WHITE } from "../styles/common";
import { MyText } from "./MyText";

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
        <View style={[styles.dayTile]}>
          <View
            style={[
              styles.circle,
              {
                borderColor: this.props.color,
                backgroundColor: this.props.color
              }
            ]}
          >
            <Icon
              type="feather"
              color={COLOR_WHITE}
              name={this.props.icon}
              size={30}
            />
          </View>
          <MyText style={styles.dayFilterText}>{this.props.type}</MyText>
        </View>
      </TouchableHighlight>
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
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
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
