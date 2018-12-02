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
import { connect } from 'react-redux';
import { PURGE } from 'redux-persist';
import { PageContainer } from '../components/PageContainer';
import { updateNotifications } from '../redux/reducers/notification';
import { updateTasks } from '../redux/reducers/tasks';
import { COLOR_TERTIARY, COLOR_WHITE } from '../styles/common';

const REMINDERS_ID = '1';

class SettingsScreen extends React.Component {
  state = {
    isDateTimePickerVisible: false
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
    } catch (error) {
      console.warn(error);
    }
  }

  enableReminder(reminderTime) {
    PushNotification.checkPermissions(permissions => {
      if (!permissions.alert) {
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
          remindersTime: this.props.remindersTime
        });
      } else {
        todaysDate = new Date();

        // Make the reminder for today
        reminderDate = new Date(reminderTime);
        reminderDate.setDate(todaysDate.getDate());
        reminderDate.setFullYear(todaysDate.getFullYear());
        reminderDate.setMonth(todaysDate.getMonth());

        // If the reminder is earlier today, make it tomorrow
        if (todaysDate.getTime() > reminderDate.getTime()) {
          reminderDate.setDate(reminderDate.getDate() + 1);
        }

        PushNotification.cancelLocalNotifications({ id: REMINDERS_ID });
        notificationObject = {
          title: 'Daily reminder',
          message: 'Find your mindful moment now!', // (required)
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
          // actions: '[""]', // (Android only) See the doc for notification actions to know more
          date: reminderDate
        };

        if (Platform.OS === 'ios') {
          PushNotification.localNotificationSchedule(
            Object.assign(notificationObject, {
              alertAction: 'view',
              // category: null,
              userInfo: { id: REMINDERS_ID }
            })
          );
        } else {
          PushNotification.localNotificationSchedule(
            Object.assign(notificationObject, {
              id: REMINDERS_ID, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
              autoCancel: true, // (optional) default: true
              largeIcon: 'ic_launcher_round', // (optional) default: "ic_launcher"
              // smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
              vibrate: true, // (optional) default: true
              vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
              ongoing: false, // (optional) set whether this is an "ongoing" notification
              priority: 'default', // (optional) set notification priority, default: high
              visibility: 'public', // (optional) set notification visibility, default: private
              importance: 'default' // (optional) set notification importance, default: high
            })
          );
        }
      }
    });
  }

  disableReminder() {
    PushNotification.cancelLocalNotifications({ id: REMINDERS_ID });
  }

  onPressToggleReminders() {
    if (!this.props.remindersEnabled) {
      this.enableReminder(this.props.remindersTime);
    } else {
      this.disableReminder();
    }

    this.props.updateNotifications({
      remindersEnabled: !this.props.remindersEnabled,
      remindersTime: this.props.remindersTime
    });
  }

  onPressCancelReminderConfigure() {
    this.setState({ isDateTimePickerVisible: false });
  }

  onPressConfirmReminderConfigure(time) {
    let dateTime = new Date(time.toString());
    this.enableReminder(dateTime);

    this.props.updateNotifications({
      remindersEnabled: true,
      remindersTime: dateTime
    });
    this.onPressCancelReminderConfigure();
  }

  onPressShowReminderConfigure() {
    this.setState({ isDateTimePickerVisible: true });
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

    return (
      <PageContainer>
        <FlatList
          data={[item3, item8, item4, item5, item2, item6, item7, item1]}
          renderItem={({ item }) => item.view}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={date => this.onPressConfirmReminderConfigure(date)}
          onCancel={() => this.onPressCancelReminderConfigure()}
          mode="time"
          date={new Date(this.props.remindersTime)}
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
    remindersTime: state.notification.remindersTime
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
