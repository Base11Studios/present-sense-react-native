import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { FocusBadge } from "../components/FocusBadge";
import { MyText } from "../components/MyText";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { Title4 } from "../components/Title4";
import TutorialView from "../components/TutorialView";
import { getBackgroundColorByDay } from "../constants/Helpers";
import { startTask } from "../redux/reducers/tasks";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

class TaskOverviewScreen extends Component {
  onPressStartTask = selectedTask => {
    this.props.startTask(selectedTask);
    this.props.navigation.navigate("RecordingTask", { task: selectedTask });
  };

  render() {
    // TODO get from store
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer>
        <TutorialView
          tutorialType="taskOverviewIntro"
          tutorialTitle="Be Present!"
          tutorialDescription={
            'Read the description and the prompt, then go ahead and start the experience. Pay attention to the prompt while you do. Click "Record" when you\'re done.'
          }
        />
        <Card title={activeTask.title} containerStyle={styles.card}>
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

          {!!activeTask.hint ? (
            <View style={styles.cardPadded}>
              <Title4 style={{ marginBottom: 10 }}>TIPS</Title4>
              <MyText style={{ marginBottom: 20 }}>{activeTask.hint}</MyText>
            </View>
          ) : (
            <View />
          )}

          <View style={styles.cardPadded}>
            <Title4 style={{ marginBottom: 10 }}>INSTRUCTIONS</Title4>
            <MyText style={{ marginBottom: 20 }}>
              Start your experience. Pay attention to the prompt. If your
              thoughts wander, it's OK, gently bring back your focus and simply
              begin again. Click JOURNAL when you're done.
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskOverviewScreen);
