import React from "react";
import Moment from "react-moment"; // TODO tz support
import { Alert, Platform, SectionList, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import PushNotification from "react-native-push-notification";
import { connect } from "react-redux";
import { PageContainer } from "../components/PageContainer";
import { updateNotifications, updateNotificationSounds } from "../redux/reducers/notification";

class NotificationsScreen extends React.Component {
  state = {
    isWeekdayReminderDateTimePickerVisible: false,
    isWeekendReminderDateTimePickerVisible: false,
    isWeekdayAffirmationDateTimePickerVisible: false,
    isWeekendAffirmationDateTimePickerVisible: false
  };

  static navigationOptions = {
    title: "Notifications"
  };

  constructor(props) {
    super(props);
  }

  handleNoNotificationPermissions() {
    let enableNotifications =
      Platform.OS === "ios"
        ? 'Notification permissions are disabled. To enable, open the Settings app > Present Sense > Notifications, then click "Allow Notifications".'
        : 'Notification permissions are disabled. To enable, open the Settings app > Apps & notifications > Present Sense > Notifications, then click "Show notifications".';

    Alert.alert(
      "Grant Us Notification Permissions",
      enableNotifications,
      [
        {
          text: "OK",
          onPress: () => {},
          style: "cancel"
        }
      ],
      { cancelable: false }
    );

    this.props.updateNotifications({
      weekdayRemindersEnabled: false,
      weekdayRemindersTime: this.props.weekdayRemindersTime,
      weekdayAffirmationsEnabled: false,
      weekdayAffirmationsTime: this.props.weekdayAffirmationsTime,
      weekendRemindersEnabled: false,
      weekendRemindersTime: this.props.weekendRemindersTime,
      weekendAffirmationsEnabled: false,
      weekendAffirmationsTime: this.props.weekendAffirmationsTime
    });
  }

  onPressToggleWeekdayReminders() {
    const remind = !this.props.weekdayRemindersEnabled;

    this.updateNotificationsWithDates(
      remind,
      this.props.weekdayRemindersTime,
      this.props.weekdayAffirmationsEnabled,
      this.props.weekdayAffirmationsTime,
      this.props.weekendRemindersEnabled,
      this.props.weekendRemindersTime,
      this.props.weekendAffirmationsEnabled,
      this.props.weekendAffirmationsTime
    );
  }

  onPressToggleWeekendReminders() {
    const remind = !this.props.weekendRemindersEnabled;

    this.updateNotificationsWithDates(
      this.props.weekdayRemindersEnabled,
      this.props.weekdayRemindersTime,
      this.props.weekdayAffirmationsEnabled,
      this.props.weekdayAffirmationsTime,
      remind,
      this.props.weekendRemindersTime,
      this.props.weekendAffirmationsEnabled,
      this.props.weekendAffirmationsTime
    );
  }

  onPressToggleWeekdayAffirmations() {
    const affirm = !this.props.weekdayAffirmationsEnabled;

    this.updateNotificationsWithDates(
      this.props.weekdayRemindersEnabled,
      this.props.weekdayRemindersTime,
      affirm,
      this.props.weekdayAffirmationsTime,
      this.props.weekendRemindersEnabled,
      this.props.weekendRemindersTime,
      this.props.weekendAffirmationsEnabled,
      this.props.weekendAffirmationsTime
    );
  }

  onPressToggleWeekendAffirmations() {
    const affirm = !this.props.weekendAffirmationsEnabled;

    this.updateNotificationsWithDates(
      this.props.weekdayRemindersEnabled,
      this.props.weekdayRemindersTime,
      this.props.weekdayAffirmationsEnabled,
      this.props.weekdayAffirmationsTime,
      this.props.weekendRemindersEnabled,
      this.props.weekendRemindersTime,
      affirm,
      this.props.weekendAffirmationsTime
    );
  }

  onPressToggleSounds() {
    const sounds = !this.props.notificationSoundsEnabled;

    this.props.updateNotificationSounds(sounds);
    this.props.updateNotifications();
  }

  onPressCancelWeekdayReminderConfigure() {
    this.setState({ isWeekdayReminderDateTimePickerVisible: false });
  }

  onPressCancelWeekdayAffirmationConfigure() {
    this.setState({ isWeekdayAffirmationDateTimePickerVisible: false });
  }

  onPressShowWeekdayReminderConfigure() {
    this.setState({ isWeekdayReminderDateTimePickerVisible: true });
  }

  onPressShowWeekdayAffirmationConfigure() {
    this.setState({ isWeekdayAffirmationDateTimePickerVisible: true });
  }

  onPressCancelWeekendReminderConfigure() {
    this.setState({ isWeekendReminderDateTimePickerVisible: false });
  }

  onPressCancelWeekendAffirmationConfigure() {
    this.setState({ isWeekendAffirmationDateTimePickerVisible: false });
  }

  onPressShowWeekendReminderConfigure() {
    this.setState({ isWeekendReminderDateTimePickerVisible: true });
  }

  onPressShowWeekendAffirmationConfigure() {
    this.setState({ isWeekendAffirmationDateTimePickerVisible: true });
  }

  onPressConfirmWeekdayReminderConfigure(time) {
    let dateTime = new Date(time.toString());

    this.updateNotificationsWithDates(
      true,
      dateTime,
      this.props.weekdayAffirmationsEnabled,
      this.props.weekdayAffirmationsTime,
      this.props.weekendRemindersEnabled,
      this.props.weekendRemindersTime,
      this.props.weekendAffirmationsEnabled,
      this.props.weekendAffirmationsTime
    );

    this.onPressCancelWeekdayReminderConfigure();
  }

  onPressConfirmWeekendReminderConfigure(time) {
    let dateTime = new Date(time.toString());

    this.updateNotificationsWithDates(
      this.props.weekdayRemindersEnabled,
      this.props.weekdayRemindersTime,
      this.props.weekdayAffirmationsEnabled,
      this.props.weekdayAffirmationsTime,
      true,
      dateTime,
      this.props.weekendAffirmationsEnabled,
      this.props.weekendAffirmationsTime
    );

    this.onPressCancelWeekendReminderConfigure();
  }

  onPressConfirmWeekdayAffirmationConfigure(time) {
    let dateTime = new Date(time.toString());

    this.updateNotificationsWithDates(
      this.props.weekdayRemindersEnabled,
      this.props.weekdayRemindersTime,
      true,
      dateTime,
      this.props.weekendRemindersEnabled,
      this.props.weekendRemindersTime,
      this.props.weekendAffirmationsEnabled,
      this.props.weekendAffirmationsTime
    );

    this.onPressCancelWeekdayAffirmationConfigure();
  }

  onPressConfirmWeekendAffirmationConfigure(time) {
    let dateTime = new Date(time.toString());

    this.updateNotificationsWithDates(
      this.props.weekdayRemindersEnabled,
      this.props.weekdayRemindersTime,
      this.props.weekdayAffirmationsEnabled,
      this.props.weekdayAffirmationsTime,
      this.props.weekendRemindersEnabled,
      this.props.weekendRemindersTime,
      true,
      dateTime
    );

    this.onPressCancelWeekendAffirmationConfigure();
  }

  updateNotificationsWithDates(
    weekdayRemindersEnabled,
    weekdayRemindersTime,
    weekdayAffirmationsEnabled,
    weekdayAffirmationsTime,
    weekendRemindersEnabled,
    weekendRemindersTime,
    weekendAffirmationsEnabled,
    weekendAffirmationsTime
  ) {
    PushNotification.checkPermissions(permissions => {
      if (!permissions.alert) {
        this.handleNoNotificationPermissions();
      } else {
        this.props.updateNotifications({
          weekdayRemindersEnabled: weekdayRemindersEnabled,
          weekdayRemindersTime: weekdayRemindersTime,
          weekdayAffirmationsEnabled: weekdayAffirmationsEnabled,
          weekdayAffirmationsTime: weekdayAffirmationsTime,
          weekendRemindersEnabled: weekendRemindersEnabled,
          weekendRemindersTime: weekendRemindersTime,
          weekendAffirmationsEnabled: weekendAffirmationsEnabled,
          weekendAffirmationsTime: weekendAffirmationsTime
        });
      }
    });
  }

  render() {
    weekdayReminderTime = {
      key: "1",
      view: (
        <ListItem
          chevron={false}
          title={
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderTimeContainer}
                activeOpacity={1}
                onPress={() => this.onPressShowWeekdayReminderConfigure()}
              >
                <View style={styles.reminderTextContainer}>
                  <Text style={styles.reminderTitle}>Daily Weekday Reminder</Text>
                  <Moment format="h:mm A" element={Text}>
                    {this.props.weekdayRemindersTime}
                  </Moment>
                </View>
              </TouchableOpacity>
              <View style={styles.reminderEnabledContainer}>
                <Switch
                  style={styles.reminderEnabledSwitch}
                  onValueChange={() => this.onPressToggleWeekdayReminders()}
                  value={this.props.weekdayRemindersEnabled}
                />
              </View>
            </View>
          }
          leftAvatar={<Icon type="material" name="notifications-none" size={24} />}
        />
      )
    };

    weekendReminderTime = {
      key: "2",
      view: (
        <ListItem
          chevron={false}
          title={
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderTimeContainer}
                activeOpacity={1}
                onPress={() => this.onPressShowWeekendReminderConfigure()}
              >
                <View style={styles.reminderTextContainer}>
                  <Text style={styles.reminderTitle}>Daily Weekend Reminder</Text>
                  <Moment format="h:mm A" element={Text}>
                    {this.props.weekendRemindersTime}
                  </Moment>
                </View>
              </TouchableOpacity>
              <View style={styles.reminderEnabledContainer}>
                <Switch
                  style={styles.reminderEnabledSwitch}
                  onValueChange={() => this.onPressToggleWeekendReminders()}
                  value={this.props.weekendRemindersEnabled}
                />
              </View>
            </View>
          }
          leftAvatar={<Icon type="material" name="notifications-none" size={24} />}
        />
      )
    };

    weekdayAffirmationTime = {
      key: "3",
      view: (
        <ListItem
          chevron={false}
          title={
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderTimeContainer}
                activeOpacity={1}
                onPress={() => this.onPressShowWeekdayAffirmationConfigure()}
              >
                <View style={styles.reminderTextContainer}>
                  <Text style={styles.reminderTitle}>Daily Weekday Affirmation</Text>
                  <Moment format="h:mm A" element={Text}>
                    {this.props.weekdayAffirmationsTime}
                  </Moment>
                </View>
              </TouchableOpacity>
              <View style={styles.reminderEnabledContainer}>
                <Switch
                  style={styles.reminderEnabledSwitch}
                  onValueChange={() => this.onPressToggleWeekdayAffirmations()}
                  value={this.props.weekdayAffirmationsEnabled}
                />
              </View>
            </View>
          }
          leftAvatar={<Icon type="material" name="notifications-none" size={24} />}
        />
      )
    };

    weekendAffirmationTime = {
      key: "9",
      view: (
        <ListItem
          chevron={false}
          title={
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderTimeContainer}
                activeOpacity={1}
                onPress={() => this.onPressShowWeekendAffirmationConfigure()}
              >
                <View style={styles.reminderTextContainer}>
                  <Text style={styles.reminderTitle}>Daily Weekend Affirmation</Text>
                  <Moment format="h:mm A" element={Text}>
                    {this.props.weekendAffirmationsTime}
                  </Moment>
                </View>
              </TouchableOpacity>
              <View style={styles.reminderEnabledContainer}>
                <Switch
                  style={styles.reminderEnabledSwitch}
                  onValueChange={() => this.onPressToggleWeekendAffirmations()}
                  value={this.props.weekendAffirmationsEnabled}
                />
              </View>
            </View>
          }
          leftAvatar={<Icon type="material" name="notifications-none" size={24} />}
        />
      )
    };

    toggleSoundsText = "Turning this setting off will silence notifications.";

    if (Platform.OS !== "ios") {
      toggleSoundsText =
        "The notifications on some devices do not respect the Do Not Disturb setting and still play a sound even when DND is on. Turning this setting off will silence notifications.";
    }

    toggleSoundsOff = {
      key: "10",
      view: (
        <ListItem
          chevron={false}
          title={
            <View style={styles.reminderContainer}>
              <View style={styles.reminderTimeContainer}>
                <View style={styles.reminderTextContainer}>
                  <Text style={styles.toggleSoundsTitle}>Notification Sounds</Text>
                  <Text style={styles.toggleSoundsText}>{toggleSoundsText}</Text>
                </View>
              </View>
              <View style={styles.reminderEnabledContainer}>
                <Switch
                  style={styles.reminderEnabledSwitch}
                  onValueChange={() => this.onPressToggleSounds()}
                  value={this.props.notificationSoundsEnabled}
                />
              </View>
            </View>
          }
          leftAvatar={<Icon type="material" name="notifications-none" size={24} />}
        />
      )
    };

    sectionArray = [
      { title: "Reminders", data: [weekdayReminderTime, weekendReminderTime] },
      { title: "Affirmations", data: [weekdayAffirmationTime, weekendAffirmationTime] },
      { title: "Options", data: [toggleSoundsOff] }
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
        {/* // keyExtractor={item => item.key} */}
        <DateTimePicker
          isVisible={this.state.isWeekdayReminderDateTimePickerVisible}
          onConfirm={date => this.onPressConfirmWeekdayReminderConfigure(date)}
          onCancel={() => this.onPressCancelWeekdayReminderConfigure()}
          mode="time"
          date={new Date(this.props.weekdayRemindersTime)}
          is24Hour={false}
        />
        <DateTimePicker
          isVisible={this.state.isWeekdayAffirmationDateTimePickerVisible}
          onConfirm={date => this.onPressConfirmWeekdayAffirmationConfigure(date)}
          onCancel={() => this.onPressCancelWeekdayAffirmationConfigure()}
          mode="time"
          date={new Date(this.props.weekdayAffirmationsTime)}
          is24Hour={false}
        />
        <DateTimePicker
          isVisible={this.state.isWeekendReminderDateTimePickerVisible}
          onConfirm={date => this.onPressConfirmWeekendReminderConfigure(date)}
          onCancel={() => this.onPressCancelWeekendReminderConfigure()}
          mode="time"
          date={new Date(this.props.weekendRemindersTime)}
          is24Hour={false}
        />
        <DateTimePicker
          isVisible={this.state.isWeekendAffirmationDateTimePickerVisible}
          onConfirm={date => this.onPressConfirmWeekendAffirmationConfigure(date)}
          onCancel={() => this.onPressCancelWeekendAffirmationConfigure()}
          mode="time"
          date={new Date(this.props.weekendAffirmationsTime)}
          is24Hour={false}
        />
      </PageContainer>
    );
  }
}

const styles = StyleSheet.create({
  reminderContainer: {
    flexDirection: "row"
  },
  reminderTimeContainer: {
    flex: 4,
    paddingLeft: 10
  },
  reminderEnabledContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column"
  },
  reminderEnabledSwitch: {
    flex: 1
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "200"
  },
  toggleSoundsTitle: {
    fontSize: 18,
    fontWeight: "200"
  },
  toggleSoundsText: {
    fontSize: 12,
    fontWeight: "200"
  },
  reminderTime: {}
});

function mapStateToProps(state, ownProps) {
  return {
    premium: state.subscription.premium,
    weekdayRemindersEnabled: state.notification.weekdayRemindersEnabled,
    weekdayRemindersTime: state.notification.weekdayRemindersTime,
    weekdayAffirmationsEnabled: state.notification.weekdayAffirmationsEnabled,
    weekdayAffirmationsTime: state.notification.weekdayAffirmationsTime,
    weekendRemindersEnabled: state.notification.weekendRemindersEnabled,
    weekendRemindersTime: state.notification.weekendRemindersTime,
    weekendAffirmationsEnabled: state.notification.weekendAffirmationsEnabled,
    weekendAffirmationsTime: state.notification.weekendAffirmationsTime,
    notificationSoundsEnabled: state.notification.notificationSoundsEnabled
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateNotifications: data => dispatch(updateNotifications(data)),
    updateNotificationSounds: data => dispatch(updateNotificationSounds(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
