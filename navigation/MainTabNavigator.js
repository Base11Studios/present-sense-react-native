import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import { StackNavigator, createBottomTabNavigator } from "react-navigation";
import { BackButton } from "../components/BackButton";
import { DismissButton } from "../components/DismissButton";
import Colors from "../constants/Colors";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import CreditsScreen from "../screens/CreditsScreen";
import FAQScreen from "../screens/FAQScreen";
import HomeScreen from "../screens/HomeScreen";
import ListTasksScreen from "../screens/ListTasksScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import RecordingTaskScreen from "../screens/RecordingTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import TaskOverviewScreen from "../screens/TaskOverviewScreen";
import TermsAndConditions from "../screens/TermsAndConditions";
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

export const DoTaskNavigator = StackNavigator({
  TaskOverview: {
    screen: TaskOverviewScreen,
    navigationOptions: props => ({
      title: "Mindful Experience",
      headerRight: <DismissButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  },
  RecordingTask: {
    screen: RecordingTaskScreen,
    navigationOptions: props => ({
      title: "Record Experience",
      headerLeft: <BackButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const SubscribeNavigator = StackNavigator({
  Subscribe: {
    screen: SubscriptionScreen,
    navigationOptions: props => ({
      title: "Subscribe",
      headerRight: <DismissButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  },
  Privacy: {
    screen: PrivacyPolicyScreen,
    navigationOptions: props => ({
      title: "Privacy Policy",
      headerLeft: <BackButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  },
  Terms: {
    screen: TermsAndConditions,
    navigationOptions: props => ({
      title: "Terms and Conditions",
      headerLeft: <BackButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const CreditsNavigator = StackNavigator({
  Credits: {
    screen: CreditsScreen,
    navigationOptions: props => ({
      title: "Credits",
      headerRight: <DismissButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const FAQNavigator = StackNavigator({
  FAQ: {
    screen: FAQScreen,
    navigationOptions: props => ({
      title: "FAQ",
      headerRight: <DismissButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const CompletedNavigator = StackNavigator({
  Completed: {
    screen: CompletedTasksScreen,
    navigationOptions: props => ({
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const SettingsNavigator = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: props => ({
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const HomeNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: props => ({
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const SearchNavigator = StackNavigator({
  Search: {
    screen: ListTasksScreen,
    navigationOptions: props => ({
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
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
    Journey: {
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
          case "Journey":
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
            containerStyle={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
      tabBarOptions: {
        activeTintColor: COLOR_PRIMARY,
        inactiveTintColor: "gray",
        style: {
          backgroundColor: COLOR_WHITE
        }
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
