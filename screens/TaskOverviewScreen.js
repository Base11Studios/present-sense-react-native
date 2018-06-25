import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { FocusBadge } from "../components/FocusBadge";
import { MyText } from "../components/MyText";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { Title4 } from "../components/Title4";
import { getBackgroundColorByDay } from "../constants/Helpers";
import { startTask } from "../redux/reducers/tasks";
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

class TaskOverviewScreen extends Component {
  onPressStartTask = selectedTask => {
    this.props.startTask(selectedTask);
    this.props.navigation.navigate("TaskObservations", { task: selectedTask });
  };

  onPressGetHelp(props) {
    this.props.navigation.navigate("TaskHelp");
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
              flexDirection: "row",
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 20
            }}
          >
            <MyText
              style={{
                flex: 1,
                fontWeight: "bold",
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
              flexDirection: "row",
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
            <View style={{ width: 100 }}>
              <FocusBadge
                focusType={activeTask.focusType}
                style={[{ marginBottom: 10 }, styles.cardPadded]}
              />
            </View>
          </View>

          {!!activeTask.hints ? (
            <View style={styles.cardPadded}>
              <Title4 style={{ marginBottom: 10 }}>TIPS</Title4>
              <MyText style={{ marginBottom: 20 }}>{activeTask.hints}</MyText>
            </View>
          ) : (
            <View />
          )}

          <View style={styles.cardPadded}>
            <MyText style={{ marginBottom: 20 }}>
              If your thoughts wander, it's OK, gently bring back your focus and
              simply begin again.
            </MyText>

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
    paddingHorizontal: 0
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
