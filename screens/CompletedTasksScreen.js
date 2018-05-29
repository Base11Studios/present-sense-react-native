import React from "react";
import Moment from "react-moment"; // TODO tz support
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import CloudTile from "../components/CloudTile";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { Title3 } from "../components/Title3";
import { Title4 } from "../components/Title4";
import { Title5 } from "../components/Title5";
import TutorialView from "../components/TutorialView";
import { COLOR_BLACK, COLOR_PRIMARY } from "../styles/common";

// TODO show time for today, day of week for past week, month and day for this year, month and day and year for previous

const MAX_UNSUBSCRIBED_EVENTS = 9;

class CompletedTasksScreen extends React.Component {
  static navigationOptions = {
    title: "Completed"
  };

  onPressHistoricalItem(item, index) {
    if (index > MAX_UNSUBSCRIBED_EVENTS && !this.props.premium) {
      this.props.navigation.navigate("Subscribe");
    } else {
      item.expanded = !item.expanded;
      this.forceUpdate();
    }
  }

  render() {
    const { completedTasks } = this.props;
    return completedTasks.length > 0 ? (
      <ScrollingPageContainer>
        <TutorialView
          tutorialType="completedIntro"
          tutorialTitle="See Your Progress"
          tutorialDescription={
            "Check in here after completing a mindful experience to see your progress and history over time!"
          }
        />
        <View>
          <Title4 style={styles.container}>MY AWARENESS</Title4>
          <CloudTile />
        </View>
        <Title4 style={styles.container}>MY EXPERIENCES</Title4>
        <FlatList
          style={{ flex: 1 }}
          data={completedTasks}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={() => this.onPressHistoricalItem(item, index)}
            >
              <View style={styles.taskView}>
                <View style={styles.circleView}>
                  <View style={styles.circle} />
                </View>
                <View style={styles.card}>
                  <Card>
                    <View style={styles.cardTitle}>
                      <View style={styles.cardTitleContainer}>
                        {!this.props.premium &&
                        index > MAX_UNSUBSCRIBED_EVENTS ? (
                          <Icon
                            name="lock"
                            type="font-awesome"
                            size={20}
                            containerStyle={{ paddingRight: 10 }}
                            color={COLOR_BLACK}
                          />
                        ) : (
                          <View />
                        )}
                        <Title3>{item.task.title}</Title3>
                      </View>
                      <View style={styles.date}>
                        <Moment fromNow element={Text}>
                          {item.completeDate}
                        </Moment>
                      </View>
                    </View>
                    {item.expanded ? (
                      <View>
                        <Title5>{item.task.prompt}</Title5>
                        <MyText style={{ marginBottom: 18 }}>
                          {item.formValues.prompt}
                        </MyText>
                        <Title5>How do you feel?</Title5>
                        <MyText>{item.formValues.feel}</MyText>
                      </View>
                    ) : null}
                  </Card>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        {completedTasks.length > 0 ? (
          <View style={[styles.taskView, styles.bottomTaskFiller]}>
            <View style={styles.circleView}>
              <View style={styles.circle} />
            </View>
            <View style={styles.card} />
          </View>
        ) : (
          <View />
        )}
      </ScrollingPageContainer>
    ) : (
      <PageContainer style={styles.container}>
        <TutorialView
          tutorialType="completedIntro"
          tutorialTitle="See Your Progress"
          tutorialDescription={
            "Come here after you've completed your first mindful experience. Check in to see your progress and history over time!"
          }
        />
        <Title3>
          You haven't completed any mindful experiences. Find one on the Home or
          Search tabs, then return here to see your stats!
        </Title3>
      </PageContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  cardTitleContainer: {
    flexDirection: "row"
  },
  cardTitle: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  date: {
    width: 85,
    alignItems: "flex-end"
  },
  card: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: COLOR_PRIMARY
  },
  circle: {
    position: "absolute",
    right: -7,
    top: 0,
    // bottom: 0,
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLOR_PRIMARY
  },
  taskView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  circleView: {
    width: 20
  },
  bottomTaskFiller: {
    marginBottom: 30
  }
});

const mapStateToProps = state => {
  let storedTasks = state.tasks.completedTasks.map(completedTask => ({
    key: completedTask.id,
    ...completedTask
  }));
  return {
    completedTasks: storedTasks,
    premium: state.subscription.premium
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CompletedTasksScreen
);

// TODO if there aren't any tasks, show msg instead of table
