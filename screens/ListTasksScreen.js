import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import AnytimeTile from "../components/AnytimeTile";
import { PageContainer } from "../components/PageContainer";
import SearchFilterView from "../components/SearchFilterView";
import { getLightBackgroundColorByDay } from "../constants/Helpers";
import { setActiveTaskType, startTask } from "../redux/reducers/tasks";
import {
  COLOR_ALERT_LIGHT,
  COLOR_HIGHLIGHT_LIGHT,
  COLOR_LIGHT_GREY,
  COLOR_PRIMARY_LIGHT,
  COLOR_SECONDARY_LIGHT
} from "../styles/common";

class ListTasksScreen extends React.Component {
  static navigationOptions = {
    title: "Search"
  };

  onPressChangeTaskType = taskType => {
    this.props.setActiveTaskType(taskType);
  };

  render() {
    const { tasks, activeTaskType } = this.props;
    return (
      <PageContainer style={styles.container}>
        <TutorialView
          tutorialType="searchIntro"
          tutorialTitle="Find a Mindful Experience"
          tutorialDescription={
            "We recommend completing the tutorials in the Learn How section on the Home tab first, then return here to find your next experience!"
          }
        />
        <View style={styles.dayFilters}>
          <TouchableOpacity
            style={styles.dayFilter}
            onPress={() => this.onPressChangeTaskType("Morning")}
          >
            <SearchFilterView
              activeTaskType={activeTaskType}
              filterType="Morning"
              icon="am"
              color={COLOR_PRIMARY_LIGHT}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayFilter}
            onPress={() => this.onPressChangeTaskType("Day")}
          >
            <SearchFilterView
              activeTaskType={activeTaskType}
              filterType="Day"
              icon="noon"
              color={COLOR_ALERT_LIGHT}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayFilter}
            onPress={() => this.onPressChangeTaskType("Evening")}
          >
            <SearchFilterView
              activeTaskType={activeTaskType}
              filterType="Evening"
              icon="pm"
              color={COLOR_HIGHLIGHT_LIGHT}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayFilter}
            onPress={() => this.onPressChangeTaskType("Anytime")}
          >
            <SearchFilterView
              activeTaskType={activeTaskType}
              filterType="Anytime"
              icon="anytime"
              color={COLOR_SECONDARY_LIGHT}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.searchList,
            {
              borderColor: getLightBackgroundColorByDay(
                this.props.activeTaskType
              )
            }
          ]}
        >
          <FlatList
            data={tasks}
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
        </View>
      </PageContainer>
    );
  }
}

// TODO on list item, have avatar that is the focus type with the appropriate color

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  avatar: {
    width: 32,
    height: 32
  },
  searchList: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    borderTopWidth: 1,
    borderColor: COLOR_LIGHT_GREY,
    paddingTop: 12
  },
  dayFilters: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 74
  },
  dayFilter: {
    flex: 1
  },
  activeDayFilter: {
    backgroundColor: COLOR_HIGHLIGHT_LIGHT
  }
});

const mapStateToProps = state => {
  let storedTasks = state.tasks.tasks
    .map(task => ({ ...task, key: task.id }))
    .filter(task => task.type === state.tasks.activeTaskType)
    .sort(function(a, b) {
      return (!!a.premium && !!b.premium) || (!a.premium && !b.premium)
        ? 0
        : !!a.premium && !b.premium
          ? 1
          : -1;
    });
  return {
    tasks: storedTasks,
    activeTaskType: state.tasks.activeTaskType,
    premium: state.subscription.premium
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTaskType: type => dispatch(setActiveTaskType(type)),
    startTask: type => dispatch(startTask(type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTasksScreen);
