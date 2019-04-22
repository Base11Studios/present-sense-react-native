import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Rate, { AndroidMarket } from "react-native-rate";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import AnytimeTasksTile from "../components/AnytimeTasksTile";
import DailyIntentionTile from "../components/DailyIntentionTile";
import EverydayTasksTile from "../components/EverydayTasksTile";
import { ExploreTasksTile } from "../components/ExploreTasksTile";
import LearnHowTile from "../components/LearnHowTile";
import MindfulQuoteTile from "../components/MindfulQuoteTile";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import TutorialView from "../components/TutorialView";
import { updateAppCount, updateVersionNumber } from "../redux/reducers/general";
import { updateNotifications } from "../redux/reducers/notification";
import { updateIAPs, updateUserSubscriptions } from "../redux/reducers/subscription";
import { updateTasks } from "../redux/reducers/tasks";
import { showTutorial } from "../redux/reducers/tutorial";
// TODO add stars to tile if have done one of the tasks today. Make BG lighter?

const VERSION_NUMBER = "3.3";

class HomeScreen extends React.Component {
  localAppOpenedCount = -1;
  static navigationOptions = {
    title: "Home"
  };

  componentDidMount() {
    this.props.updateAppCount();
    // Did they have a previous version?
    if (!!this.props.versionNumber && parseFloat(this.props.versionNumber) < parseFloat(VERSION_NUMBER)) {
      const buttons = [];

      buttons.push({
        text: "Take Me There!",
        onPress: () => {
          this.props.navigation.navigate("Notifications");
        }
      });

      buttons.push({
        text: "OK"
      });

      Alert.alert(
        "What's New?",
        "Setup different times for notifications on weekdays and weekends. Make notifications silent for less interruption.",
        buttons,
        { cancelable: false }
      );
    }
    this.props.updateVersionNumber(VERSION_NUMBER);
    this.props.updateTasks();
    this.props.updateIAPs();
    this.props.updateNotifications();

    if (!this.props.tutorial["appIntro"]) {
      this.props.navigation.navigate("Intro");
    }
    SplashScreen.hide();

    if (this.props.appOpenedCount > 6 && this.props.appOpenedCount % 8 === 0 && !this.props.tutorial["rateApp"]) {
      this.rateApp();
    }

    this.localAppOpenedCount = this.props.appOpenedCount;
  }

  rateApp() {
    let options = {
      AppleAppID: "1390285501",
      GooglePackageName: "com.base11studios.presentmoment",
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: "https://base11studios.com/clients/present-sense/"
    };
    const buttons = [
      {
        text: "Yes, I'll Help!",
        onPress: () => {
          Rate.rate(options, success => {
            if (success) {
              this.props.showTutorial({ type: "rateApp" });
            }
          });
        }
      },
      {
        text: "Remind Me",
        style: "cancel"
      },
      {
        text: "Never",
        onPress: () => this.props.showTutorial({ type: "rateApp" })
      }
    ];
    Alert.alert(
      "Show us some love!",
      "If you're finding Present Sense helpful, will you take a moment to rate us on the app store?",
      buttons,
      { cancelable: false }
    );
  }

  componentWillUnmount() {
    this.props.updateUserSubscriptions({
      userDriven: false
    });
  }

  dailyIntentionWasStartedToday() {
    return new Date().toDateString() === new Date(this.props.dailyIntentionSetDate).toDateString();
  }

  render() {
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer>
        {!this.props.remindersEnabled && this.localAppOpenedCount % 10 === 1 && this.props.completedTasks.length > 0 ? (
          <TutorialView
            {...this.props}
            tutorialNavigation={"Settings"}
            tutorialType="remindersIntro"
            tutorialTitle="Setup a Daily Reminder!"
            tutorialDescription={"Let us help you find mindful moments. Visit Settings to enable these."}
          />
        ) : (
          <View />
        )}
        {!this.props.premium && this.localAppOpenedCount > 1 && this.props.completedTasks.length > 0 ? (
          <TutorialView
            {...this.props}
            tutorialNavigation={"Subscribe"}
            tutorialType="intentionIntro"
            tutorialTitle="New: Daily Intention!"
            tutorialDescription={
              "Premium users can now set a daily intention in the morning and check back throughout the day. Finish it at night by journaling about your experience."
            }
          />
        ) : (
          <View />
        )}
        {this.props.dailyIntentionStatus !== "ACTIVE" || !this.dailyIntentionWasStartedToday() ? (
          <MindfulQuoteTile />
        ) : (
          <DailyIntentionTile {...this.props} />
        )}
        <LearnHowTile {...this.props} />
        <EverydayTasksTile {...this.props} />
        <ExploreTasksTile {...this.props} />
        <AnytimeTasksTile {...this.props} />
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    premium: state.subscription.premium,
    tutorial: state.tutorial.tutorial,
    activeTask: state.tasks.activeTask,
    completedTasks: state.tasks.completedTasks,
    remindersEnabled: state.notification.remindersEnabled,
    affirmationsEnabled: state.notification.affirmationsEnabled,
    appOpenedCount: state.general.appOpenedCount,
    dailyIntentionSetDate: state.tasks.dailyIntentionSetDate,
    dailyIntentionStatus: state.tasks.dailyIntentionStatus,
    versionNumber: state.general.versionNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTasks: () => dispatch(updateTasks()),
    updateUserSubscriptions: data => dispatch(updateUserSubscriptions(data)),
    updateIAPs: () => dispatch(updateIAPs()),
    updateAppCount: () => dispatch(updateAppCount()),
    updateVersionNumber: versionNumber => dispatch(updateVersionNumber(versionNumber)),
    updateNotifications: () => dispatch(updateNotifications()),
    showTutorial: tutorial => dispatch(showTutorial(tutorial))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
