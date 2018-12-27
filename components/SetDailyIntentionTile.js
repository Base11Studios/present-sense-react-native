import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { COLOR_QUATERNARY, COLOR_WHITE } from '../styles/common';
import { FocusTypeIcon } from './FocusTypeIcon';
import { MyText } from './MyText';

class SetDailyIntentionTile extends React.Component {
  onPressStartTask() {
    if (!this.props.premium) {
      this.props.navigation.navigate('Subscribe');
    } else {
      this.props.navigation.navigate('DailyIntention');
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPressStartTask()}>
        <View style={[styles.card, { backgroundColor: COLOR_QUATERNARY }]}>
          <FocusTypeIcon style={styles.avatar} focusType={'Intent'} />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <MyText
              style={{
                textAlign: 'center',
                color: COLOR_WHITE,
                fontSize: 18,
                fontWeight: '600',
                marginRight: 28
              }}
            >
              Set a daily intention
            </MyText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  dayTile: {
    height: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    marginLeft: 16
  },
  buttonText: {
    // padding: 20,
    color: COLOR_WHITE
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

function mapStateToProps(state, props) {
  return {
    premium: state.subscription.premium
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDailyIntentionTile);
