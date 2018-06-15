import React from "react";
import { StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import AnytimeTasksTile from "../components/AnytimeTasksTile";
import { EverydayTasksTile } from "../components/EverydayTasksTile";
import LearnHowTile from "../components/LearnHowTile";
import MindfulQuoteTile from "../components/MindfulQuoteTile";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import TutorialView from "../components/TutorialView";
import {
  updateIAPs,
  updateUserSubscriptions
} from "../redux/reducers/subscription";
import { updateTasks } from "../redux/reducers/tasks";
// TODO add stars to tile if have done one of the tasks today. Make BG lighter?

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  componentDidMount() {
    this.props.updateTasks();
    this.props.updateIAPs();
    if (!this.props.tutorial["appIntro"]) {
      this.props.navigation.navigate("Intro");
    }
    SplashScreen.hide();
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
          {...this.props}
          tutorialNavigation={"FAQ"}
          tutorialType="homeIntro"
          tutorialTitle="Welcome to Present Sense!"
          tutorialDescription={
            "Start with the tutorials in the Learn How section to continue your learning journey. If you want to learn the 'why' behind mindfulness, see the FAQ section in Settings."
          }
        />
        <MindfulQuoteTile />
        <LearnHowTile {...this.props} />
        <EverydayTasksTile {...this.props} />
        <AnytimeTasksTile {...this.props} />
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    tutorial: state.tutorial.tutorial,
    activeTask: state.tasks.activeTask
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTasks: () => dispatch(updateTasks()),
    updateUserSubscriptions: data => dispatch(updateUserSubscriptions(data)),
    updateIAPs: () => dispatch(updateIAPs()),
    showTutorial: tutorial => dispatch(showTutorial(tutorial))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
