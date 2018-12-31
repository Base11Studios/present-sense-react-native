import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {
  DAILY_INTENTION_ADDITIONAL_INFO,
  DAILY_INTENTION_OBSERVATION_OVERRIDE
} from '../constants/LabelVault';
import { startTask } from '../redux/reducers/tasks';
import { getDailyIntentionTask } from '../redux/selectors';
import { COLOR_HIGHLIGHT, COLOR_WHITE } from '../styles/common';
import { MyText } from './MyText';
import { Title4 } from './Title4';

class DailyIntentionTile extends React.Component {
  onPressTile() {
    // TODO this is duplicated code from Anytime Tile
    this.props.dailyIntentionTask.observationOverride = DAILY_INTENTION_OBSERVATION_OVERRIDE.replace(
      '${INTENTION}',
      this.props.dailyIntention
    );
    this.props.dailyIntentionTask.additionalInfo = DAILY_INTENTION_ADDITIONAL_INFO.replace(
      '${INTENTION}',
      this.props.dailyIntention
    );

    this.props.startTask(this.props.dailyIntentionTask);
    this.props.navigation.navigate('TaskObservations', {
      task: this.props.dailyIntentionTask
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPressTile()}>
        <View style={[styles.header, { backgroundColor: COLOR_HIGHLIGHT }]}>
          <Title4
            style={[styles.quoteTextContainer, { paddingBottom: 6 }]}
            textStyle={styles.quoteText}
          >
            TODAY'S INTENTION
          </Title4>
          <MyText style={styles.quoteAuthor}>
            {this.props.dailyIntention}
          </MyText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
    marginBottom: 10
  },
  quoteTextContainer: {
    flex: 1,
    textAlign: 'center'
  },
  quoteText: {
    color: COLOR_WHITE,
    fontSize: 16
  },
  quoteAuthor: {
    flex: 1,
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 28
  }
});

function mapStateToProps(state) {
  return {
    dailyIntention: state.tasks.dailyIntention,
    dailyIntentionTask: getDailyIntentionTask(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTask: type => dispatch(startTask(type))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyIntentionTile);
