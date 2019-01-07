import React from 'react';
import Moment from 'react-moment'; // TODO tz support
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import Rate, { AndroidMarket } from 'react-native-rate';
import { connect } from 'react-redux';
import { PURGE } from 'redux-persist';
import { PageContainer } from '../components/PageContainer';
import { updateNotifications } from '../redux/reducers/notification';
import { updateTasks } from '../redux/reducers/tasks';
import { COLOR_TERTIARY, COLOR_WHITE } from '../styles/common';

class SettingsScreen extends React.Component {
  state = {
    isReminderDateTimePickerVisible: false,
    isAffirmationDateTimePickerVisible: false
  };

  static navigationOptions = {
    title: 'Settings'
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

  handleNoNotificationPermissions() {
    let enableNotifications =
      Platform.OS === 'ios'
        ? 'Notification permissions are disabled. To enable, open the Settings app > Present Sense > Notifications, then click "Allow Notifications".'
        : 'Notification permissions are disabled. To enable, open the Settings app > Apps & notifications > Present Sense > Notifications, then click "Show notifications".';

    Alert.alert(
      'Grant Us Notification Permissions',
      enableNotifications,
      [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );

    this.props.updateNotifications({
      remindersEnabled: false,
      remindersTime: this.props.remindersTime,
      affirmationsEnabled: false,
      affirmationsTime: this.props.affirmationsTime
    });
  }

  onPressToggleReminders() {
    const remind = !this.props.remindersEnabled;

    this.updateNotificationsWithDates(
      remind,
      this.props.remindersTime,
      this.props.affirmationsEnabled,
      this.props.affirmationsTime
    );
  }

  onPressToggleAffirmations() {
    const affirm = !this.props.affirmationsEnabled;

    this.updateNotificationsWithDates(
      this.props.remindersEnabled,
      this.props.remindersTime,
      affirm,
      this.props.affirmationsTime
    );
  }

  onPressCancelReminderConfigure() {
    this.setState({ isReminderDateTimePickerVisible: false });
  }

  onPressCancelAffirmationConfigure() {
    this.setState({ isAffirmationDateTimePickerVisible: false });
  }

  onPressShowReminderConfigure() {
    this.setState({ isReminderDateTimePickerVisible: true });
  }

  onPressShowAffirmationConfigure() {
    this.setState({ isAffirmationDateTimePickerVisible: true });
  }

  onPressConfirmReminderConfigure(time) {
    let dateTime = new Date(time.toString());

    this.updateNotificationsWithDates(
      true,
      dateTime,
      this.props.affirmationsEnabled,
      this.props.affirmationsTime
    );

    this.onPressCancelReminderConfigure();
  }

  onPressConfirmAffirmationConfigure(time) {
    let dateTime = new Date(time.toString());

    this.updateNotificationsWithDates(
      this.props.remindersEnabled,
      this.props.remindersTime,
      true,
      dateTime
    );

    this.onPressCancelAffirmationConfigure();
  }

  updateNotificationsWithDates(
    remindersEnabled,
    remindersTime,
    affirmationsEnabled,
    affirmationsTime
  ) {
    PushNotification.checkPermissions(permissions => {
      if (!permissions.alert) {
        this.handleNoNotificationPermissions();
      } else {
        this.props.updateNotifications({
          remindersEnabled: remindersEnabled,
          remindersTime: remindersTime,
          affirmationsEnabled: affirmationsEnabled,
          affirmationsTime: affirmationsTime
        });
      }
    });
  }

  onPressResetStore() {
    const { dispatch } = this.props;

    Alert.alert(
      'Are You Sure?',
      'Clearing data will reset the application back to its defaults. You will lose all of your progress.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Clear Data',
          onPress: () => {
            dispatch({
              type: PURGE,
              key: 'root',
              result: () => {}
            });
            this.props.navigation.navigate('Home');
            this.props.updateTasks();
          }
        }
      ],
      { cancelable: false }
    );
  }

  rateApp() {
    let options = {
      AppleAppID: '1390285501',
      GooglePackageName: 'com.base11studios.presentmoment',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://base11studios.com/clients/present-sense/'
    };
    Rate.rate(options, success => {});
  }

  // TODO nav back to home screen on clear

  render() {
    item1 = {
      key: '1',
      view: (
        <ListItem
          onPress={() => this.onPressResetStore()}
          title="Reset Data"
          avatar={<Icon type="evilicon" name="undo" size={24} />}
        />
      )
    };

    item2 = {
      key: '2',
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate('Credits')}
          title="Credits"
          avatar={
            <Icon
              type="simple-line-icon"
              name="notebook"
              size={20}
              containerStyle={{ padding: 2 }}
            />
          }
        />
      )
    };

    item4 = {
      key: '4',
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate('FAQ')}
          title="FAQ"
          avatar={
            <Icon
              type="font-awesome"
              name="question-circle-o"
              size={24}
              containerStyle={{ paddingLeft: 2, paddingRight: 2 }}
            />
          }
        />
      )
    };

    item5 = {
      key: '5',
      view: (
        <ListItem
          onPress={() =>
            this.openURL(
              'mailto:support@base11studios.com?subject=Present Sense ' +
                Platform.OS +
                ' App'
            )
          }
          title="Contact Us"
          avatar={
            <Icon
              type="material-community"
              name="email-outline"
              size={22}
              containerStyle={{ paddingLeft: 2, paddingRight: 0 }}
            />
          }
        />
      )
    };

    item6 = {
      key: '6',
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate('SettingsPrivacy')}
          title="Privacy Policy"
          avatar={
            <Icon
              type="font-awesome"
              name="lock"
              size={26}
              containerStyle={{ paddingLeft: 4, paddingRight: 4 }}
            />
          }
        />
      )
    };

    item7 = {
      key: '7',
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate('SettingsTerms')}
          title="Terms & Conditions"
          avatar={
            <Icon
              type="font-awesome"
              name="file-text-o"
              size={23}
              containerStyle={{ paddingLeft: 2, paddingRight: 2 }}
            />
          }
        />
      )
    };

    item3 = {
      key: '3',
      view: !this.props.premium ? (
        <ListItem
          onPress={() => this.props.navigation.navigate('Subscribe')}
          title="Unlock Premium"
          avatar={<Icon type="material" name="star-border" size={24} />}
        />
      ) : (
        <ListItem
          onPress={() => this.props.navigation.navigate('Subscribe')}
          title="Unlock Premium"
          avatar={<Icon type="material" name="star-border" size={24} />}
          hideChevron={true}
          disabled={true}
          badge={{
            value: 'SUBSCRIBED',
            textStyle: { color: COLOR_WHITE },
            containerStyle: { backgroundColor: COLOR_TERTIARY }
          }}
        />
      )
    };

    item8 = {
      key: '8',
      view: (
        <ListItem
          hideChevron={true}
          title={
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderTimeContainer}
                activeOpacity={1}
                onPress={() => this.onPressShowReminderConfigure()}
              >
                <View style={styles.reminderTextContainer}>
                  <Text style={styles.reminderTitle}>Daily Reminder</Text>
                  <Moment format="h:mm A" element={Text}>
                    {this.props.remindersTime}
                  </Moment>
                </View>
              </TouchableOpacity>
              <View style={styles.reminderEnabledContainer}>
                <Switch
                  style={styles.reminderEnabledSwitch}
                  onValueChange={() => this.onPressToggleReminders()}
                  value={this.props.remindersEnabled}
                />
              </View>
            </View>
          }
          avatar={<Icon type="material" name="notifications-none" size={24} />}
        />
      )
    };

    item9 = {
      key: '9',
      view: (
        <ListItem
          hideChevron={true}
          title={
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderTimeContainer}
                activeOpacity={1}
                onPress={() => this.onPressShowAffirmationConfigure()}
              >
                <View style={styles.reminderTextContainer}>
                  <Text style={styles.reminderTitle}>Daily Affirmation</Text>
                  <Moment format="h:mm A" element={Text}>
                    {this.props.affirmationsTime}
                  </Moment>
                </View>
              </TouchableOpacity>
              <View style={styles.reminderEnabledContainer}>
                <Switch
                  style={styles.reminderEnabledSwitch}
                  onValueChange={() => this.onPressToggleAffirmations()}
                  value={this.props.affirmationsEnabled}
                />
              </View>
            </View>
          }
          avatar={<Icon type="material" name="notifications-none" size={24} />}
        />
      )
    };

    let options = {
      AppleAppID: '1390285501',
      GooglePackageName: 'com.base11studios.presentmoment',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://base11studios.com/clients/present-sense/'
    };

    item10 = {
      key: '10',
      view: (
        <ListItem
          onPress={() => {
            this.rateApp();
          }}
          title="Review Present Sense"
          avatar={
            <Icon
              type="font-awesome"
              name="question-circle-o"
              size={24}
              containerStyle={{ paddingLeft: 2, paddingRight: 2 }}
            />
          }
        />
      )
    };

    return (
      <PageContainer>
        <FlatList
          data={[
            item3,
            item8,
            item9,
            item10,
            item4,
            item5,
            item2,
            item6,
            item7,
            item1
          ]}
          renderItem={({ item }) => item.view}
        />
        <DateTimePicker
          isVisible={this.state.isReminderDateTimePickerVisible}
          onConfirm={date => this.onPressConfirmReminderConfigure(date)}
          onCancel={() => this.onPressCancelReminderConfigure()}
          mode="time"
          date={new Date(this.props.remindersTime)}
          is24Hour={false}
        />
        <DateTimePicker
          isVisible={this.state.isAffirmationDateTimePickerVisible}
          onConfirm={date => this.onPressConfirmAffirmationConfigure(date)}
          onCancel={() => this.onPressCancelAffirmationConfigure()}
          mode="time"
          date={new Date(this.props.affirmationsTime)}
          is24Hour={false}
        />
      </PageContainer>
    );
  }
}

const styles = StyleSheet.create({
  reminderContainer: {
    flexDirection: 'row'
  },
  reminderTimeContainer: {
    flex: 4,
    paddingLeft: 10
  },
  reminderEnabledContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  reminderEnabledSwitch: {
    flex: 1
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '200'
  },
  reminderTime: {}
});

function mapStateToProps(state, ownProps) {
  return {
    premium: state.subscription.premium,
    remindersEnabled: state.notification.remindersEnabled,
    remindersTime: state.notification.remindersTime,
    affirmationsEnabled: state.notification.affirmationsEnabled,
    affirmationsTime: state.notification.affirmationsTime
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateTasks: () => dispatch(updateTasks()),
    updateNotifications: data => dispatch(updateNotifications(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
