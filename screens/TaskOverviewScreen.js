import React, { Component } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Card, Icon } from 'react-native-elements';
import Picker from 'react-native-picker';
import { connect } from 'react-redux';
import { FocusBadge } from '../components/FocusBadge';
import { MyText } from '../components/MyText';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScrollingPageContainer } from '../components/ScrollingPageContainer';
import { Title4 } from '../components/Title4';
import { getBackgroundColorByDay } from '../constants/Helpers';
import { startTask } from '../redux/reducers/tasks';
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE } from '../styles/common';

class TaskOverviewScreen extends Component {
  state = {
    isTipsOpen: false,
    isTimerEnabled: false,
    isSoundOpen: false,
    timerLength: ['00', '05', '00']
  };

  componentWillMount() {
    pickerData = [
      ['00', '01', '02', '03', '04', '05'],
      ['00', '01', '02', '03', '04', '05'],
      ['00', '01', '02', '03', '04', '05']
    ];

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
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      }
    });
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

  onPressTimerLength() {
    Picker.show();
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
            <View
              style={[
                styles.cardPadded,
                {
                  flexDirection: 'row'
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => this.onPressToggleTimer()}
                style={{ flex: 1 }}
              >
                <View>
                  <Title4 style={{ marginBottom: 20 }}>TIMER</Title4>
                </View>
              </TouchableOpacity>
              <View style={{ width: 50, alignItems: 'flex-end' }}>
                <Switch
                  onValueChange={() => this.onPressToggleTimer()}
                  value={this.state.isTimerEnabled}
                />
              </View>
            </View>

            <Collapsible collapsed={!this.state.isTimerEnabled}>
              <View style={[styles.cardPadded, { minHeight: 100 }]}>
                <TouchableOpacity
                  style={{
                    marginBottom: 20,
                    flex: 1,
                    alignItems: 'center'
                  }}
                  onPress={() => this.onPressTimerLength()}
                >
                  <MyText style={{ fontSize: 40, paddingBottom: 10 }}>
                    {(this.state.timerLength[0] !== '00'
                      ? this.state.timerLength[0] + ':'
                      : '') +
                      this.state.timerLength[1] +
                      ':' +
                      this.state.timerLength[2]}
                  </MyText>
                </TouchableOpacity>
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
                      flexDirection: 'row'
                    }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Title4 style={{ marginBottom: 20 }}>GET TIPS</Title4>
                  </View>
                  <View style={{ width: 150, alignItems: 'flex-end' }}>
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
