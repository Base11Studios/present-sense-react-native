import React from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import AnytimeTasksTile from '../components/AnytimeTasksTile';
import { EverydayTasksTile } from '../components/EverydayTasksTile';
import LearnHowTile from '../components/LearnHowTile';
import MindfulQuoteTile from '../components/MindfulQuoteTile';
import { ScrollingPageContainer } from '../components/ScrollingPageContainer';
import TutorialView from '../components/TutorialView';
import { updateAppCount } from '../redux/reducers/general';
import {
  updateIAPs,
  updateUserSubscriptions
} from '../redux/reducers/subscription';
import { updateTasks } from '../redux/reducers/tasks';
// TODO add stars to tile if have done one of the tasks today. Make BG lighter?

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
    this.props.updateAppCount();
    this.props.updateTasks();
    this.props.updateIAPs();
    if (!this.props.tutorial['appIntro']) {
      this.props.navigation.navigate('Intro');
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
        {!this.props.remindersEnabled && this.props.appOpenedCount > 1 ? (
          <TutorialView
            {...this.props}
            tutorialNavigation={'Settings'}
            tutorialType="remindersIntro"
            tutorialTitle="Setup a Daily Reminder!"
            tutorialDescription={
              'Let us help you remember to find your mindful moments. Visit Settings to enable these.'
            }
          />
        ) : (
          <View />
        )}
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
    activeTask: state.tasks.activeTask,
    remindersEnabled: state.notification.remindersEnabled,
    appOpenedCount: state.general.appOpenedCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTasks: () => dispatch(updateTasks()),
    updateUserSubscriptions: data => dispatch(updateUserSubscriptions(data)),
    updateIAPs: () => dispatch(updateIAPs()),
    updateAppCount: () => dispatch(updateAppCount()),
    showTutorial: tutorial => dispatch(showTutorial(tutorial))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
