import React from "react";
import { StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import AnytimeTasksTile from "../components/AnytimeTasksTile";
import { EverydayTasksTile } from "../components/EverydayTasksTile";
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
            'Present Sense teaches Mindful Journaling. Complete multiple "Mindful Experiences" a day to build your awareness of the world and start living your life in the present! See the FAQ section in Settings for all the benefits.'
          }
        />
        <MindfulQuoteTile />
        <EverydayTasksTile {...this.props} />
        <AnytimeTasksTile {...this.props} />
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({});

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
