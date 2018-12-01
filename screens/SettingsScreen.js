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
import { connect } from 'react-redux';
import { PURGE } from 'redux-persist';
import { PageContainer } from '../components/PageContainer';
import { updateNotifications } from '../redux/reducers/notification';
import { updateTasks } from '../redux/reducers/tasks';
import { COLOR_TERTIARY, COLOR_WHITE } from '../styles/common';

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

  onPressToggleReminders() {
    this.props.updateNotifications({
      remindersEnabled: !this.props.remindersEnabled,
      remindersTime: this.props.remindersTime
    });
  }

  onPressCancelReminderConfigure() {
    this.setState({ isDateTimePickerVisible: false });
  }

  onPressConfirmReminderConfigure(time) {
    this.props.updateNotifications({
      remindersEnabled: true,
      remindersTime: new Date(time.toString())
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
                  <Text style={styles.reminderTitle}>Reminders Enabled</Text>
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
          avatar={<Icon type="evilicon" name="undo" size={24} />}
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
    fontSize: 18
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
