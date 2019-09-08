import React from "react";
import { Alert, Linking, Platform, SectionList, StyleSheet, Text } from "react-native";
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
    itemResetData = {
      key: "1",
      view: (
        <ListItem onPress={() => this.onPressResetStore()} title="Reset Data" leftAvatar={<Icon type="evilicon" name="undo" size={24} />} />
      )
    };

    itemCredit = {
      key: "2",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("Credits")}
          title="Credits"
          leftAvatar={<Icon type="simple-line-icon" name="notebook" size={20} containerStyle={{ padding: 2 }} />}
        />
      )
    };

    itemFaq = {
      key: "4",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("FAQ")}
          title="FAQ"
          leftAvatar={<Icon type="font-awesome" name="question-circle-o" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      )
    };

    itemContactUs = {
      key: "5",
      view: (
        <ListItem
          onPress={() => this.openURL("mailto:support@base11studios.com?subject=Present Sense " + Platform.OS + " App")}
          title="Contact Us"
          leftAvatar={
            <Icon type="material-community" name="email-outline" size={22} containerStyle={{ paddingLeft: 2, paddingRight: 0 }} />
          }
        />
      )
    };

    itemPrivacy = {
      key: "6",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("SettingsPrivacy")}
          title="Privacy Policy"
          leftAvatar={<Icon type="font-awesome" name="lock" size={26} containerStyle={{ paddingLeft: 4, paddingRight: 4 }} />}
        />
      )
    };

    itemTerms = {
      key: "7",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("SettingsTerms")}
          title="Terms & Conditions"
          leftAvatar={<Icon type="font-awesome" name="file-text-o" size={23} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      )
    };

    itemSubscribe = {
      key: "3",
      view: !this.props.premium ? (
        <ListItem
          onPress={() => this.props.navigation.navigate("Subscribe")}
          title="Unlock Premium"
          leftAvatar={<Icon type="material" name="star-border" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      ) : (
        <ListItem
          onPress={() => this.props.navigation.navigate("Subscribe")}
          title="Unlock Premium"
          leftAvatar={<Icon type="material" name="star-border" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
          chevron={false}
          disabled={true}
          badge={{
            value: "SUBSCRIBED",
            textStyle: { color: COLOR_WHITE },
            containerStyle: { backgroundColor: COLOR_TERTIARY }
          }}
        />
      )
    };

    itemNotifications = {
      key: "8",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("Notifications")}
          title="Notifications"
          leftAvatar={<Icon type="material" name="notifications-none" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
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

    itemReview = {
      key: "10",
      view: (
        <ListItem
          onPress={() => {
            this.rateApp();
          }}
          title="Review Present Sense"
          leftAvatar={<Icon type="font-awesome" name="pencil-square-o" size={24} containerStyle={{ paddingLeft: 2, paddingRight: 2 }} />}
        />
      )
    };

    sectionArray = [
      { title: "", data: [itemSubscribe, itemReview, itemNotifications] },
      { title: "", data: [itemContactUs, itemFaq] },
      { title: "", data: [itemCredit, itemPrivacy, itemTerms] },
      { title: "", data: [itemResetData] }
    ];

    return (
      <PageContainer>
        <SectionList
          renderItem={({ item }) => item.view}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              style={{
                backgroundColor: "#EFF1F4",
                fontSize: 10,
                padding: 2,
                color: "#fff",
                fontWeight: "bold"
              }}
            />
          )}
          sections={sectionArray}
        />
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
