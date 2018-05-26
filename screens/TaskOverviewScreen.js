import React, { Component } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { FocusBadge } from "../components/FocusBadge";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { Title4 } from "../components/Title4";
import { Title5 } from "../components/Title5";
import { getFocusTypeColor } from "../constants/Helpers";
import { startTask } from "../redux/reducers/tasks";
import { COLOR_WHITE } from "../styles/common";

class TaskOverviewScreen extends Component {
  onPressStartTask = selectedTask => {
    this.props.startTask(selectedTask);
    this.props.navigation.navigate("RecordingTask", { task: selectedTask });
  };

  render() {
    // TODO get from store
    const { activeTask } = this.props;

    return (
      <PageContainer>
        <Card title={activeTask.title} containerStyle={styles.card}>
          <FocusBadge
            focusType={activeTask.focusType}
            style={[{ marginBottom: 10 }, styles.cardPadded]}
          />
          <MyText style={[{ marginBottom: 26 }, styles.cardPadded]}>
            {activeTask.description}
          </MyText>

          <View
            style={{
              backgroundColor: getFocusTypeColor(activeTask.focusType),
              marginBottom: 26
            }}
          >
            <Title4
              textStyle={{ color: COLOR_WHITE }}
              style={{
                marginLeft: 16,
                marginBottom: 10,
                marginTop: 20
              }}
            >
              PROMPT
            </Title4>
            <MyText
              style={{ color: COLOR_WHITE, marginLeft: 16, marginBottom: 20 }}
            >
              {activeTask.prompt}
            </MyText>
          </View>

          <View style={styles.cardPadded}>
            <Title4 style={{ marginBottom: 10 }}>INSTRUCTIONS</Title4>
            <MyText style={{ marginBottom: 20 }}>
              Go ahead and start your experience. Pay attention to the prompt.
              If your thoughts wander, it's OK, gently bring back your focus and
              simply begin again.
            </MyText>
            <Title5 style={{ marginBottom: 20 }}>
              Click RECORD when you're done.
            </Title5>

            <Button
              icon={{ name: "code" }}
              backgroundColor="#03A9F4"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="RECORD"
              onPress={() => this.onPressStartTask(activeTask)}
            />
          </View>
        </Card>
      </PageContainer>
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
