import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { FocusTypeIcon } from "../components/FocusTypeIcon";
import { PageContainer } from "../components/PageContainer";
import SearchFilterView from "../components/SearchFilterView";
import TutorialView from "../components/TutorialView";
import { setActiveTaskType, startTask } from "../redux/reducers/tasks";
import {
  COLOR_HIGHLIGHT,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_TERTIARY
} from "../styles/common";

class ListTasksScreen extends React.Component {
  static navigationOptions = {
    title: "Search"
  };

  onPressChangeTaskType = taskType => {
    this.props.setActiveTaskType(taskType);
  };

  onPressViewTask = task => {
    if (!!task.premium && !this.props.premium) {
      this.props.navigation.navigate("Subscribe");
    } else {
      this.props.startTask(task);
      this.props.navigation.navigate("DoTask");
    }
  };

  render() {
    const { tasks, activeTaskType } = this.props;
    return (
      <PageContainer style={styles.container}>
        <TutorialView
          tutorialType="searchIntro"
          tutorialTitle="Find a Present Moment"
          tutorialDescription={
            'Click the "time of day" tabs to find a task suited for the time, or try the Anytime tab whenever you want!'
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
              iconName="sunrise"
              color={COLOR_PRIMARY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayFilter}
            onPress={() => this.onPressChangeTaskType("Day")}
          >
            <SearchFilterView
              activeTaskType={activeTaskType}
              filterType="Day"
              iconName="sun"
              color={COLOR_SECONDARY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayFilter}
            onPress={() => this.onPressChangeTaskType("Evening")}
          >
            <SearchFilterView
              activeTaskType={activeTaskType}
              filterType="Evening"
              iconName="moon"
              color={COLOR_TERTIARY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayFilter}
            onPress={() => this.onPressChangeTaskType("Anytime")}
          >
            <SearchFilterView
              activeTaskType={activeTaskType}
              filterType="Anytime"
              iconName="more-horizontal"
              color={COLOR_HIGHLIGHT}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchList}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <ListItem
                containerStyle={{ padding: 4, marginTop: 4, height: 60 }}
                onPress={() => this.onPressViewTask(item)}
                title={item.title}
                avatar={
                  <FocusTypeIcon
                    focusType={
                      !!item.premium && !this.props.premium
                        ? "Locked"
                        : item.focusType
                    }
                  />
                }
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
    borderTopWidth: 1
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
    backgroundColor: COLOR_HIGHLIGHT
  }
});

const mapStateToProps = state => {
  let storedTasks = state.tasks.tasks
    .map(task => ({ ...task, key: task.id }))
    .filter(task => task.type === state.tasks.activeTaskType);
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

export default connect(mapStateToProps, mapDispatchToProps)(ListTasksScreen);
