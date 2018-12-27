import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  CreditsNavigator,
  DailyIntentionNavigator,
  DoTaskNavigator,
  FAQNavigator,
  IntroNavigator,
  PrivacyNavigator,
  SettingsNavigator,
  SubscribeNavigator,
  TabNavigator,
  TaskHelpNavigator,
  TermsNavigator,
  TutorialNavigator,
  ViewTaskNavigator
} from './MainTabNavigator';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: TabNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    DailyIntention: {
      screen: DailyIntentionNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    ViewTask: {
      screen: ViewTaskNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    DoTask: {
      screen: DoTaskNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    Subscribe: {
      screen: SubscribeNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    Credits: {
      screen: CreditsNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    FAQ: {
      screen: FAQNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    TaskHelp: {
      screen: TaskHelpNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    SettingsPrivacy: {
      screen: PrivacyNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    SettingsTerms: {
      screen: TermsNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    Intro: {
      screen: IntroNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    Tutorial: {
      screen: TutorialNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
