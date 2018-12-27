import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { COLOR_ALERT, COLOR_WHITE } from '../styles/common';
import { MyText } from './MyText';
import { Title4 } from './Title4';

class DailyIntentionTile extends React.Component {
  render() {
    return (
      <View style={[styles.header, { backgroundColor: COLOR_ALERT }]}>
        <Title4 style={[styles.quoteText, { paddingBottom: 20 }]}>
          Today's Intention
        </Title4>
        <MyText style={styles.quoteAuthor}>{props.dailyIntention}</MyText>
      </View>
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
  quoteText: {
    flex: 1,
    textAlign: 'center',

    color: COLOR_WHITE,
    fontSize: 18
  },
  quoteAuthor: {
    flex: 1,
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 16
  }
});

function mapStateToProps(state) {
  return {
    dailyIntention: state.tasks.dailyIntention
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyIntentionTile);
