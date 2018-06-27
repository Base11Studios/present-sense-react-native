import React from "react";
import { StackNavigator } from "react-navigation";
import {
  CreditsNavigator,
  DoTaskNavigator,
  FAQNavigator,
  IntroNavigator,
  PrivacyNavigator,
  SubscribeNavigator,
  TabNavigator,
  TaskHelpNavigator,
  TermsNavigator,
  TutorialNavigator,
  ViewTaskNavigator
} from "./MainTabNavigator";

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: TabNavigator
    },
    ViewTask: {
      screen: ViewTaskNavigator
    },
    DoTask: {
      screen: DoTaskNavigator
    },
    Subscribe: {
      screen: SubscribeNavigator
    },
    Credits: {
      screen: CreditsNavigator
    },
    FAQ: {
      screen: FAQNavigator
    },
    TaskHelp: {
      screen: TaskHelpNavigator
    },
    SettingsPrivacy: {
      screen: PrivacyNavigator
    },
    SettingsTerms: {
      screen: TermsNavigator
    },
    Intro: {
      screen: IntroNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
    },
    Tutorial: {
      screen: TutorialNavigator
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
