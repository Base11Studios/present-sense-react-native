import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { setActiveTaskType } from '../redux/reducers/tasks';
import { getEverydayTasks } from '../redux/selectors';
import { COLOR_PRIMARY } from '../styles/common';
import AnytimeTile from './AnytimeTile';
import { MyText } from './MyText';
import { Title4 } from './Title4';

class EverydayTasksTile extends React.Component {
  onPressMoreTasks() {
    this.props.setActiveTaskType('Anytime');
    this.props.navigation.navigate('Search');
  }

  getEverydayCompletionText() {
    return 'EVERYDAY (' + this.props.everydayTasks.length.toString() + ' of 3)';
  }

  render() {
    const { everydayTasks } = this.props;
    return (
      <View style={styles.tile}>
        <Title4 style={styles.container}>
          {this.getEverydayCompletionText()}
        </Title4>
        {everydayTasks.length > 0 ? (
          <View>
            <FlatList
              style={styles.flatList}
              data={everydayTasks}
              renderItem={({ item }) => (
                <AnytimeTile
                  {...this.props}
                  focusType={
                    !!item.premium && !this.props.premium
                      ? 'Locked'
                      : item.focusType
                  }
                  taskId={item.id}
                  listItem={item}
                />
              )}
            />
          </View>
        ) : (
          <View style={styles.completed}>
            <MyText>
              Great job, you completed your daily mindful experiences! Explore
              more experiences below to stay present.
            </MyText>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  completed: {
    paddingLeft: 20,
    paddingRight: 20
  },
  link: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold'
  },
  more: {
    alignItems: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20
  },
  flatList: {
    // borderTopColor: "gray",
    // borderTopWidth: 1
  },
  tile: {
    marginBottom: 20
  }
});

function mapStateToProps(state) {
  let tasks = getEverydayTasks(state).map(task => ({
    key: task.id,
    ...task
  }));
  return {
    premium: state.subscription.premium,
    everydayTasks: tasks,
    dailyIntentionStatus: state.tasks.dailyIntentionStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveTaskType: type => dispatch(setActiveTaskType(type))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EverydayTasksTile);
