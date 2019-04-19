import React from "react";
import { Alert, FlatList, Linking, Platform, StyleSheet } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Rate, { AndroidMarket } from "react-native-rate";
import { connect } from "react-redux";
import { PURGE } from "redux-persist";
import { PageContainer } from "../components/PageContainer";
import { updateTasks } from "../redux/reducers/tasks";
import { COLOR_TERTIARY, COLOR_WHITE } from "../styles/common";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  constructor(props) {
    super(props);
  }

  // Opens a link
  async openURL(url) {
    try {
      await Linking.openURL(url);
    } catch (error) {}
  }

  onPressResetStore() {
    const { dispatch } = this.props;

    Alert.alert(
      "Are You Sure?",
      "Clearing data will reset the application back to its defaults. You will lose all of your progress.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Clear Data",
          onPress: () => {
            dispatch({
              type: PURGE,
              key: "root",
              result: () => {}
            });
            this.props.navigation.navigate("Home");
            this.props.updateTasks();
          }
        }
      ],
      { cancelable: false }
    );
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
    Rate.rate(options, success => {});
  }

  // TODO nav back to home screen on clear

  render() {
    item1 = {
      key: "1",
      view: <ListItem onPress={() => this.onPressResetStore()} title="Reset Data" avatar={<Icon type="evilicon" name="undo" size={24} />} />
    };

    item2 = {
      key: "2",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("Credits")}
          title="Credits"
          avatar={<Icon type="simple-line-icon" name="notebook" size={20} containerStyle={{ padding: 2 }} />}
        />
      )
    };

    item4 = {
      key: "4",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("FAQ")}
          title="FAQ"
          avatar={<Icon type="font-awesome" name="question-circle-o" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      )
    };

    item5 = {
      key: "5",
      view: (
        <ListItem
          onPress={() => this.openURL("mailto:support@base11studios.com?subject=Present Sense " + Platform.OS + " App")}
          title="Contact Us"
          avatar={<Icon type="material-community" name="email-outline" size={22} containerStyle={{ paddingLeft: 2, paddingRight: 0 }} />}
        />
      )
    };

    item6 = {
      key: "6",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("SettingsPrivacy")}
          title="Privacy Policy"
          avatar={<Icon type="font-awesome" name="lock" size={26} containerStyle={{ paddingLeft: 4, paddingRight: 4 }} />}
        />
      )
    };

    item7 = {
      key: "7",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("SettingsTerms")}
          title="Terms & Conditions"
          avatar={<Icon type="font-awesome" name="file-text-o" size={23} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      )
    };

    item3 = {
      key: "3",
      view: !this.props.premium ? (
        <ListItem
          onPress={() => this.props.navigation.navigate("Subscribe")}
          title="Unlock Premium"
          avatar={<Icon type="material" name="star-border" size={24} />}
        />
      ) : (
        <ListItem
          onPress={() => this.props.navigation.navigate("Subscribe")}
          title="Unlock Premium"
          avatar={<Icon type="material" name="star-border" size={24} />}
          hideChevron={true}
          disabled={true}
          badge={{
            value: "SUBSCRIBED",
            textStyle: { color: COLOR_WHITE },
            containerStyle: { backgroundColor: COLOR_TERTIARY }
          }}
        />
      )
    };

    item8 = {
      key: "8",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("Notifications")}
          title="Notifications"
          avatar={<Icon type="font-awesome" name="question-circle-o" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      )
    };

    let options = {
      AppleAppID: "1390285501",
      GooglePackageName: "com.base11studios.presentmoment",
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: "https://base11studios.com/clients/present-sense/"
    };

    item10 = {
      key: "10",
      view: (
        <ListItem
          onPress={() => {
            this.rateApp();
          }}
          title="Review Present Sense"
          avatar={<Icon type="font-awesome" name="question-circle-o" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      )
    };

    return (
      <PageContainer>
        <FlatList data={[item3, item8, item10, item4, item5, item2, item6, item7, item1]} renderItem={({ item }) => item.view} />
      </PageContainer>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state, ownProps) {
  return {
    premium: state.subscription.premium
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateTasks: () => dispatch(updateTasks())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
