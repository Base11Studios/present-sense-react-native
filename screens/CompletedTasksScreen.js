import React from 'react';
import Moment from 'react-moment'; // TODO tz support
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';
import AdvancedStatTile from '../components/AdvancedStatTile';
import CloudTile from '../components/CloudTile';
import { FocusTypeIcon } from '../components/FocusTypeIcon';
import { MyText } from '../components/MyText';
import { PageContainer } from '../components/PageContainer';
import { ScrollingPageContainer } from '../components/ScrollingPageContainer';
import StatTile from '../components/StatTile';
import { Title3 } from '../components/Title3';
import { Title4 } from '../components/Title4';
import { Title5 } from '../components/Title5';
import { getBackgroundColorByDay } from '../constants/Helpers';
import { COLOR_PRIMARY, COLOR_WHITE } from '../styles/common';

// TODO show time for today, day of week for past week, month and day for this year, month and day and year for previous

const MAX_UNSUBSCRIBED_EVENTS = 9;

class CompletedTasksScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  };

  getDateFormat(date) {
    if (!!date && new Date(date).getFullYear() === new Date().getFullYear()) {
      return 'MM/DD';
    }

    return 'MM/DD/YYYY';
  }

  onPressHistoricalItem(item, index) {
    if (index > MAX_UNSUBSCRIBED_EVENTS && !this.props.premium) {
      this.props.navigation.navigate('Subscribe');
    } else {
      item.expanded = !item.expanded;
      this.forceUpdate();
    }
  }

  render() {
    const { completedTasks } = this.props;
    return completedTasks.length > 0 ? (
      <ScrollingPageContainer>
        {/* <TutorialView
          tutorialType="completedIntro"
          tutorialTitle="Your Journey"
          tutorialDescription={
            "Check in here after completing a mindful experience to see your progress and history over time!"
          }
        /> */}
        <StatTile />
        <View>
          <Title4 style={styles.container}>MY AWARENESS</Title4>
          <CloudTile />
        </View>
        {this.props.premium ? (
          <View style={{ backgroundColor: COLOR_PRIMARY }}>
            <Title4 style={styles.container} textStyle={{ color: COLOR_WHITE }}>
              MY FOCUS
            </Title4>
            <AdvancedStatTile />
            <View style={{ marginBottom: 18 }} />
          </View>
        ) : (
          <View />
        )}
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
                <View style={styles.contentWrapper}>
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: getBackgroundColorByDay(item.task.type)
                      }
                    ]}
                  >
                    <View style={styles.headline}>
                      <FocusTypeIcon
                        style={styles.avatar}
                        focusType={
                          !this.props.premium && index > MAX_UNSUBSCRIBED_EVENTS
                            ? 'Locked'
                            : item.task.focusType
                        }
                      />
                      <View style={{ alignItems: 'flex-start', flex: 1 }}>
                        <MyText
                          style={{
                            color: COLOR_WHITE,
                            fontSize: 15,
                            fontWeight: '600',
                            marginRight: 6,
                            marginLeft: 6
                          }}
                        >
                          {item.task.title}
                        </MyText>
                      </View>
                      <View style={styles.date}>
                        <Moment
                          format={this.getDateFormat(item.completeDate)}
                          element={Text}
                          style={{ color: COLOR_WHITE, fontWeight: '600' }}
                        >
                          {item.completeDate}
                        </Moment>
                        <Moment
                          format="h:mm a"
                          element={Text}
                          style={{ color: COLOR_WHITE }}
                        >
                          {item.completeDate}
                        </Moment>
                      </View>
                    </View>

                    {item.expanded ? (
                      <View>
                        <Title5 style={{ marginTop: 18, color: COLOR_WHITE }}>
                          {item.task.prompt}
                        </Title5>
                        <MyText
                          style={{ marginBottom: 18, color: COLOR_WHITE }}
                        >
                          {item.formValues.prompt}
                        </MyText>
                        <Title5 style={{ color: COLOR_WHITE }}>
                          How do you feel?
                        </Title5>
                        <MyText style={{ color: COLOR_WHITE }}>
                          {item.formValues.feel}
                        </MyText>
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
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
        {/* <TutorialView
          tutorialType="completedIntro"
          tutorialTitle="Your Journey"
          tutorialDescription={
            "Come here after you've completed your first mindful experience. Check in to see your progress and history over time!"
          }
        /> */}
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
  headline: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitleContainer: {
    flexDirection: 'row'
  },
  title: { flex: 1 },
  cardTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  date: {
    width: 90,
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  contentWrapper: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: COLOR_PRIMARY
  },
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 8,
    borderRadius: 6,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  circle: {
    position: 'absolute',
    right: -7,
    top: 0,
    // bottom: 0,
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLOR_PRIMARY
  },
  taskView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTasksScreen);

// TODO if there aren't any tasks, show msg instead of table
