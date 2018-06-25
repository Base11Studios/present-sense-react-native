import React from "react";
import { Animated, Easing, Platform } from "react-native";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator, StackNavigator } from "react-navigation";
import { BackButton } from "../components/BackButton";
import { DismissButton } from "../components/DismissButton";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import CreditsScreen from "../screens/CreditsScreen";
import FAQScreen from "../screens/FAQScreen";
import HomeScreen from "../screens/HomeScreen";
import IntroActivityScreen from "../screens/IntroActivityScreen";
import IntroConclusionScreen from "../screens/IntroConclusionScreen";
import IntroFeelingsScreen from "../screens/IntroFeelingsScreen";
import IntroObservationsScreen from "../screens/IntroObservationsScreen";
import IntroOverviewScreen from "../screens/IntroOverviewScreen";
import IntroScreen from "../screens/IntroScreen";
import ListTasksScreen from "../screens/ListTasksScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import TaskFeelingsScreen from "../screens/TaskFeelingsScreen";
import TaskHelpScreen from "../screens/TaskHelpScreen";
import TaskObservationsScreen from "../screens/TaskObservationsScreen";
import TaskOverviewScreen from "../screens/TaskOverviewScreen";
import TermsAndConditions from "../screens/TermsAndConditions";
import TutorialActivityScreen from "../screens/TutorialActivityScreen";
import TutorialConclusionScreen from "../screens/TutorialConclusionScreen";
import TutorialFeelingsScreen from "../screens/TutorialFeelingsScreen";
import TutorialHelperScreen from "../screens/TutorialHelperScreen";
import TutorialObservationsScreen from "../screens/TutorialObservationsScreen";
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WHITE
} from "../styles/common";

export const ViewTaskNavigator = StackNavigator({
  TaskOverview: {
    screen: TaskOverviewScreen,
    navigationOptions: props => ({
      title: "Mindful Experience",
      headerMode: "float",
      headerRight: <DismissButton {...props} />,
      headerTintColor: COLOR_BLACK,
      headerStyle: {
        backgroundColor: COLOR_WHITE
      }
    })
  }
});

export const DoTaskNavigator = StackNavigator(
  {
    TaskObservations: {
      screen: TaskObservationsScreen,
      navigationOptions: props => ({
        title: "Journal Observations",
        // header: null,
        // headerMode: "none",
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TaskFeelings: {
      screen: TaskFeelingsScreen,
      navigationOptions: props => ({
        title: "Journal Feelings",
        headerLeft: <BackButton {...props} />,
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    }
  },
  {
    headerMode: "none",
    modal: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);

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

export const TutorialNavigator = StackNavigator(
  {
    TutorialHelper1: {
      screen: TutorialHelperScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TutorialHelper2: {
      screen: TutorialHelperScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TutorialHelper3: {
      screen: TutorialHelperScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TutorialHelper4: {
      screen: TutorialHelperScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TutorialActivity: {
      screen: TutorialActivityScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TutorialObservations: {
      screen: TutorialObservationsScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TutorialFeelings: {
      screen: TutorialFeelingsScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    },
    TutorialConclusion: {
      screen: TutorialConclusionScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        }
      })
    }
  },
  {
    header: null,
    headerMode: "none",
    modal: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);

export const IntroNavigator = StackNavigator(
  {
    Intro: {
      screen: IntroScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        },
        gesturesEnabled: false
      })
    },
    IntroOverview: {
      screen: IntroOverviewScreen,
      navigationOptions: props => ({
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        },
        gesturesEnabled: false
      })
    },
    IntroActivity: {
      screen: IntroActivityScreen,
      navigationOptions: props => ({
        headerLeft: <BackButton {...props} />,
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        },
        gesturesEnabled: false
      })
    },
    IntroObservations: {
      screen: IntroObservationsScreen,
      navigationOptions: props => ({
        headerLeft: <BackButton {...props} />,
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        },
        gesturesEnabled: false
      })
    },
    IntroFeelings: {
      screen: IntroFeelingsScreen,
      navigationOptions: props => ({
        headerLeft: <BackButton {...props} />,
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        },
        gesturesEnabled: false
      })
    },
    IntroConclusion: {
      screen: IntroConclusionScreen,
      navigationOptions: props => ({
        headerLeft: <BackButton {...props} />,
        headerTintColor: COLOR_BLACK,
        headerStyle: {
          backgroundColor: COLOR_WHITE
        },
        gesturesEnabled: false
      })
    }
  },
  {
    header: null,
    headerMode: "none",
    modal: false,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);

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

export const TaskHelpNavigator = StackNavigator({
  TaskHelp: {
    screen: TaskHelpScreen,
    navigationOptions: props => ({
      title: "Mindfulness Help",
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
                ? `ios-home${focused ? "" : "-outline"}`
                : "md-home";
            break;
          case "Search":
            iconName =
              Platform.OS === "ios"
                ? `ios-search${focused ? "" : "-outline"}`
                : "md-search";
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
            color={focused ? COLOR_PRIMARY : COLOR_SECONDARY}
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
