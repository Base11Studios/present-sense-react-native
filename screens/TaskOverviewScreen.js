import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Collapsible from 'react-native-collapsible';
import { Card, Icon } from 'react-native-elements';
import Picker from 'react-native-picker';
import Sound from 'react-native-sound';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { FocusBadge } from '../components/FocusBadge';
import { MyText } from '../components/MyText';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScrollingPageContainer } from '../components/ScrollingPageContainer';
import { Title4 } from '../components/Title4';
import { getBackgroundColorByDay } from '../constants/Helpers';
import { startTask } from '../redux/reducers/tasks';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_TERTIARY,
  COLOR_WHITE
} from '../styles/common';

class TaskOverviewScreen extends Component {
  state = {
    isTipsOpen: false,
    isTimerEnabled: false,
    isTimerPlaying: false,
    isSoundOpen: false,
    isTimerLengthSetOpen: false,
    completeTimerSound: null,
    timerLength: ['00', '05', '00']
  };

  componentWillUnmount() {
    BackgroundTimer.stopBackgroundTimer();
  }

  onPressStartTask = selectedTask => {
    this.props.startTask(selectedTask);
    this.props.navigation.navigate('TaskObservations', { task: selectedTask });
  };

  onPressGetHelp(props) {
    this.props.navigation.navigate('TaskHelp');
  }

  onPressToggleTips() {
    this.setState({ isTipsOpen: !this.state.isTipsOpen });
  }

  onPressToggleTimer() {
    this.setState({ isTimerEnabled: !this.state.isTimerEnabled });
  }

  setupSound() {
    // Enable playback in silence mode
    Sound.setCategory('Playback');
    Sound.setMode('SpokenAudio');

    this.state.completeTimerSound = new Sound(
      'bell.wav',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.warn('failed to load the sound', error);
          return;
        }
      }
    );

    this.state.completeTimerSound.setNumberOfLoops(0);
  }

  playSound() {
    this.state.completeTimerSound.play(success => {
      if (!success) {
        console.warn('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        this.state.completeTimerSound.reset();
      }
    });
  }

  advanceTimer() {
    if (this.state.timerLength[2] !== '00') {
      let seconds = parseInt(this.state.timerLength[2]);
      seconds = seconds - 1;
      this.state.timerLength[2] =
        seconds < 10 ? '0' + seconds.toString() : seconds.toString();

      if (
        this.state.timerLength[2] === '00' &&
        this.state.timerLength[1] === '00' &&
        this.state.timerLength[0] === '00' &&
        !!this.state.isTimerPlaying
      ) {
        this.stopTimer();
        this.playSound();
      }
    } else if (this.state.timerLength[1] !== '00') {
      let minutes = parseInt(this.state.timerLength[1]);
      minutes = minutes - 1;
      this.state.timerLength[2] = '59';
      this.state.timerLength[1] =
        minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    } else if (this.state.timerLength[0] !== '00') {
      let hours = parseInt(this.state.timerLength[0]);
      hours = hours - 1;
      this.state.timerLength[2] = '59';
      this.state.timerLength[1] = '59';
      this.state.timerLength[0] =
        hours < 10 ? '0' + hours.toString() : hours.toString();
    }
    this.forceUpdate();
  }

  onPressTimerPlayToggle() {
    if (!this.state.isTimerLengthSetOpen) {
      const newState = !this.state.isTimerPlaying;
      this.setState({ isTimerPlaying: newState });

      this.setupSound();

      BackgroundTimer.stopBackgroundTimer();
      if (!!newState) {
        if (
          this.state.timerLength[2] !== '00' ||
          this.state.timerLength[1] !== '00' ||
          this.state.timerLength[0] !== '00'
        ) {
          if (
            !(
              this.state.timerLength[2] === '01' &&
              this.state.timerLength[1] === '00' &&
              this.state.timerLength[0] === '00'
            )
          ) {
            this.advanceTimer();
          }
          BackgroundTimer.runBackgroundTimer(() => {
            this.advanceTimer();
          }, 1000);
        }
      }
    }
  }

  stopTimer() {
    BackgroundTimer.stopBackgroundTimer();
    this.setState({ isTimerPlaying: false });
  }

  getDoublePaddedString(num) {
    if (num < 10 && num > -10) {
      return '0' + num.toString();
    } else {
      return num.toString();
    }
  }

  onPressTimerLength() {
    this.stopTimer();

    pickerData = [[], [], []];

    for (let i = 0; i < 60; i++) {
      if (i < 24) {
        pickerData[0].push(this.getDoublePaddedString(i));
      }
      pickerData[1].push(this.getDoublePaddedString(i));
      pickerData[2].push(this.getDoublePaddedString(i));
    }

    Picker.init({
      pickerData: pickerData,
      selectedValue: this.state.timerLength,
      pickerTitleText: 'HH : MM : SS',
      pickerConfirmBtnText: 'SET',
      pickerCancelBtnText: 'CLOSE',
      pickerConfirmBtnColor: [255, 255, 255, 1],
      pickerCancelBtnColor: [255, 255, 255, 1],
      pickerTitleColor: [255, 255, 255, 1],
      pickerToolBarBg: [113, 210, 200, 1],
      pickerBg: [255, 255, 255, 1],
      pickerFontSize: 30,
      pickerRowHeight: 30,
      pickerFontColor: [51, 51, 51, 1],
      onPickerConfirm: data => {
        this.setState({ timerLength: data });
        this.setState({ isTimerLengthSetOpen: false });
      },
      onPickerCancel: data => {
        this.setState({ isTimerLengthSetOpen: false });
      },
      onPickerSelect: data => {}
    });

    this.setState({ isTimerLengthSetOpen: true });
    Picker.show();
  }

  isTimerLengthZero() {
    return (
      this.state.timerLength[2] === '00' &&
      this.state.timerLength[1] === '00' &&
      this.state.timerLength[0] === '00'
    );
  }

  render() {
    // TODO get from store
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer>
        {/* <TutorialView
          tutorialType="taskOverviewIntro"
          tutorialTitle="Be Present!"
          tutorialDescription={
            'Read the description and the prompt, then go ahead and start the experience. Pay attention to the prompt while you do. Click "Record" when you\'re done.'
          }
        /> */}
        <Card containerStyle={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 20
            }}
          >
            <MyText
              style={{
                flex: 1,
                fontWeight: 'bold',
                fontSize: 16,
                color: COLOR_BLACK
              }}
            >
              {activeTask.title}
            </MyText>
            <TouchableOpacity onPress={() => this.onPressGetHelp()}>
              <Icon
                type="font-awesome"
                name="question-circle-o"
                size={21}
                containerStyle={[{ padding: 0 }, this.props.style]}
                color={COLOR_PRIMARY}
              />
            </TouchableOpacity>
          </View>
          <MyText style={[{ marginBottom: 26 }, styles.cardPadded]}>
            {activeTask.description}
          </MyText>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: getBackgroundColorByDay(activeTask.type),
              marginBottom: 26
            }}
          >
            <View style={{ flex: 1 }}>
              <Title4
                textStyle={{ color: COLOR_WHITE }}
                style={{
                  marginLeft: 16,
                  marginBottom: 10,
                  marginTop: 20
                }}
              >
                FOCUS
              </Title4>
              <MyText
                style={{ color: COLOR_WHITE, marginLeft: 16, marginBottom: 20 }}
              >
                {activeTask.prompt}
              </MyText>
            </View>
            <View style={{ width: 150, alignItems: 'flex-end' }}>
              <FocusBadge
                focusType={activeTask.focusType}
                style={[{ marginBottom: 10 }, styles.cardPadded]}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => this.onPressToggleTimer()}
              style={{ flex: 1 }}
            >
              <View
                style={[
                  styles.cardPadded,
                  {
                    flexDirection: 'row',
                    marginBottom: 10
                  }
                ]}
              >
                <View style={{ flex: 3 }}>
                  <Title4>TIMER</Title4>
                </View>
                {!this.state.isTimerEnabled ? (
                  <View style={{ flex: 1 }}>
                    <MyText style={{ fontSize: 16, color: COLOR_BLACK }}>
                      {(this.state.timerLength[0] !== '00'
                        ? this.state.timerLength[0] + ':'
                        : '') +
                        this.state.timerLength[1] +
                        ':' +
                        this.state.timerLength[2]}
                    </MyText>
                  </View>
                ) : (
                  <View />
                )}
                <View style={{ width: 50, alignItems: 'flex-end' }}>
                  <Icon
                    type="ionicon"
                    color={COLOR_BLACK}
                    name={
                      !this.state.isTimerEnabled
                        ? 'ios-arrow-down'
                        : 'ios-arrow-up'
                    }
                    size={24}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <Collapsible collapsed={!this.state.isTimerEnabled}>
              <View
                style={[
                  styles.cardPadded,
                  styles.toggleCard,
                  { minHeight: 50, marginBottom: 10 }
                ]}
              >
                <TouchableOpacity
                  style={{
                    flex: 4,
                    alignItems: 'center'
                  }}
                  onPress={() => this.onPressTimerLength()}
                >
                  <MyText style={{ fontSize: 40, color: COLOR_WHITE }}>
                    {(this.state.timerLength[0] !== '00'
                      ? this.state.timerLength[0] + ':'
                      : '') +
                      this.state.timerLength[1] +
                      ':' +
                      this.state.timerLength[2]}
                  </MyText>
                </TouchableOpacity>
                {!this.isTimerLengthZero() ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'center'
                    }}
                    onPress={() => this.onPressTimerPlayToggle()}
                  >
                    <AntIcon
                      name={
                        !this.state.isTimerPlaying
                          ? 'playcircleo'
                          : 'pausecircleo'
                      }
                      size={34}
                      containerStyle={{ padding: 7 }}
                      color={COLOR_WHITE}
                    />
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
            </Collapsible>
          </View>

          {!!activeTask.hints ? (
            <View>
              <TouchableOpacity onPress={() => this.onPressToggleTips()}>
                <View
                  style={[
                    styles.cardPadded,
                    {
                      flexDirection: 'row',
                      marginTop: 10,
                      marginBottom: 20
                    }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Title4>GET TIPS</Title4>
                  </View>
                  <View style={{ width: 50, alignItems: 'flex-end' }}>
                    <Icon
                      type="ionicon"
                      color={COLOR_BLACK}
                      name={
                        !this.state.isTipsOpen
                          ? 'ios-arrow-down'
                          : 'ios-arrow-up'
                      }
                      size={24}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={!this.state.isTipsOpen}>
                <View style={styles.cardPadded}>
                  <MyText style={{ marginBottom: 20 }}>
                    {activeTask.hints}
                  </MyText>
                  <MyText style={{ marginBottom: 20 }}>
                    If your thoughts wander, it's OK, gently bring back your
                    focus and simply begin again.
                  </MyText>
                </View>
              </Collapsible>
            </View>
          ) : (
            <View />
          )}

          <View style={styles.cardPadded}>
            <PrimaryButton
              color={COLOR_PRIMARY}
              title="JOURNAL"
              onPress={() => this.onPressStartTask(activeTask)}
            />
          </View>
        </Card>
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    marginBottom: 20
  },
  cardPadded: {
    marginLeft: 16,
    marginRight: 16
  },
  toggleCard: {
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 8,
    borderRadius: 6,
    backgroundColor: COLOR_TERTIARY,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    activeTask: state.tasks.activeTask
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startTask: type => dispatch(startTask(type))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskOverviewScreen);
