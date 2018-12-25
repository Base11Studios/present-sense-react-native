import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { setActiveTaskType } from '../redux/reducers/tasks';
import { getEverydayTasks } from '../redux/selectors';
import { COLOR_PRIMARY } from '../styles/common';
import AnytimeTile from './AnytimeTile';
import { Title4 } from './Title4';

class EverydayTasksTile extends React.Component {
  onPressMoreTasks() {
    this.props.setActiveTaskType('Anytime');
    this.props.navigation.navigate('Search');
  }

  render() {
    const { everydayTasks } = this.props;
    return (
      <View style={styles.tile}>
        <Title4 style={styles.container}>EVERYDAY</Title4>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
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
    everydayTasks: tasks
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
