import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import AnytimeTasksTile from "../components/AnytimeTasksTile";
import { EverydayTasksTile } from "../components/EverydayTasksTile";
import MindfulQuoteTile from "../components/MindfulQuoteTile";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import StatTile from "../components/StatTile";
import TutorialView from "../components/TutorialView";
import {
  updateIAPs,
  updateUserSubscriptions
} from "../redux/reducers/subscription";
import { updateTasks } from "../redux/reducers/tasks";
import { COLOR_WHITE } from "../styles/common";
// TODO add stars to tile if have done one of the tasks today. Make BG lighter?

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  componentDidMount() {
    this.props.updateTasks();
    this.props.updateIAPs();
  }

  componentWillUnmount() {
    this.props.updateUserSubscriptions({
      userDriven: false
    });
  }

  render() {
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer>
        <TutorialView
          tutorialType="homeIntro"
          tutorialTitle="Welcome to PresMo!"
          tutorialDescription={
            'PresMo teaches Mindful Journaling. Complete multiple "Present Moments" a day to build your awareness of the world and start living your life in the present! See the Help section in Settings for all the benefits.'
          }
        />
        <StatTile />
        <MindfulQuoteTile />
        <EverydayTasksTile {...this.props} />
        <AnytimeTasksTile {...this.props} />
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  },
  contentContainer: {
    paddingTop: 30
  },
  header: {
    height: 200,
    backgroundColor: COLOR_WHITE,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    activeTask: state.tasks.activeTask
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTasks: () => dispatch(updateTasks()),
    updateUserSubscriptions: data => dispatch(updateUserSubscriptions(data)),
    updateIAPs: () => dispatch(updateIAPs())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
