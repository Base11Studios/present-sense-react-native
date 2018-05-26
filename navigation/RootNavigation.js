import React from "react";
import { StackNavigator } from "react-navigation";
import {
  CreditsNavigator,
  DoTaskNavigator,
  SubscribeNavigator,
  TabNavigator
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
