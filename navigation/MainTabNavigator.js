import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import { StackNavigator, createBottomTabNavigator } from "react-navigation";
import { BackButton } from "../components/BackButton";
import { DismissButton } from "../components/DismissButton";
import Colors from "../constants/Colors";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import CreditsScreen from "../screens/CreditsScreen";
import HomeScreen from "../screens/HomeScreen";
import ListTasksScreen from "../screens/ListTasksScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import RecordingTaskScreen from "../screens/RecordingTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import TaskOverviewScreen from "../screens/TaskOverviewScreen";
import TermsAndConditions from "../screens/TermsAndConditions";

export const DoTaskNavigator = StackNavigator({
  TaskOverview: {
    screen: TaskOverviewScreen,
    navigationOptions: props => ({
      title: "Experience Mindfully",
      headerRight: <DismissButton {...props} />
    })
  },
  RecordingTask: {
    screen: RecordingTaskScreen,
    navigationOptions: props => ({
      title: "Record Your Thoughts",
      headerLeft: <BackButton {...props} />
    })
  }
});

export const SubscribeNavigator = StackNavigator({
  Subscribe: {
    screen: SubscriptionScreen,
    navigationOptions: props => ({
      title: "Subscribe",
      headerRight: <DismissButton {...props} />
    })
  },
  Privacy: {
    screen: PrivacyPolicyScreen,
    navigationOptions: props => ({
      title: "Privacy Policy",
      headerLeft: <BackButton {...props} />
    })
  },
  Terms: {
    screen: TermsAndConditions,
    navigationOptions: props => ({
      title: "Terms and Conditions",
      headerLeft: <BackButton {...props} />
    })
  }
});

export const CreditsNavigator = StackNavigator({
  Credits: {
    screen: CreditsScreen,
    navigationOptions: props => ({
      title: "Credits",
      headerRight: <DismissButton {...props} />
    })
  }
});

export const CompletedNavigator = StackNavigator({
  Completed: {
    screen: CompletedTasksScreen
  }
});

export const SettingsNavigator = StackNavigator({
  Settings: {
    screen: SettingsScreen
  }
});

export const HomeNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export const SearchNavigator = StackNavigator({
  Search: {
    screen: ListTasksScreen
  }
});

export const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator
    },
    Search: {
      screen: SearchNavigator
    },
    Completed: {
      screen: CompletedNavigator
    },
    Settings: {
      screen: SettingsNavigator
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Home":
            iconName =
              Platform.OS === "ios"
                ? `ios-star${focused ? "" : "-outline"}`
                : "md-star";
            break;
          case "Search":
            iconName =
              Platform.OS === "ios"
                ? `ios-list${focused ? "-box" : ""}`
                : "md-list";
            break;
          case "Completed":
            iconName =
              Platform.OS === "ios"
                ? `ios-checkmark-circle${focused ? "" : "-outline"}`
                : "md-checkmark-circle";
            break;
          case "Settings":
            iconName =
              Platform.OS === "ios"
                ? `ios-options${focused ? "" : "-outline"}`
                : "md-options";
        }
        return (
          <Icon
            name={iconName}
            size={28}
            type="ionicon"
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }
    })
  }
);

// header: null,
// headerMode: "none"
// }),
// animationEnabled: false,
// swipeEnabled: false
// }
