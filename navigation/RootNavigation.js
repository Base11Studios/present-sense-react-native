import React from "react";
import { StackNavigator } from "react-navigation";
import {
  CreditsNavigator,
  DoTaskNavigator,
  FAQNavigator,
  IntroNavigator,
  SubscribeNavigator,
  TabNavigator,
  TaskHelpNavigator
} from "./MainTabNavigator";

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: TabNavigator
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
    Intro: {
      screen: IntroNavigator,
      navigationOptions: props => ({
        gesturesEnabled: false
      })
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
