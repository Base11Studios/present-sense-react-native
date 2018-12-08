import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { affirmationData } from '../redux/reducers/affirmation-data';
import {
  COLOR_HIGHLIGHT,
  COLOR_PRIMARY,
  COLOR_QUATERNARY,
  COLOR_SECONDARY,
  COLOR_TERTIARY,
  COLOR_WHITE
} from '../styles/common';
import { MyText } from './MyText';

class AffirmationTile extends React.Component {
  affirmationNumber = this.getRandomAffirmationNumber();

  getNewAffirmation() {
    this.affirmationNumber = this.getRandomAffirmationNumber();
    this.forceUpdate();
  }

  getRandomAffirmationNumber() {
    let affirmationLength = affirmationData.length;
    if (!this.props.premium) {
      affirmationLength = 10;
    }

    return Math.floor(Math.random() * affirmationLength);
  }

  pressGetNotifications() {
    this.props.navigation.navigate('Settings');
  }

  pressUnlockAffirmations() {
    this.props.navigation.navigate('Subscribe');
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.getNewAffirmation()}
        style={{ flex: 1 }}
        activeOpacity={0.9}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: this.getBackgroundColor(this.affirmationNumber) }
          ]}
        >
          {!this.props.premium ? (
            <View style={styles.refresh}>
              <MyText
                style={{
                  color: COLOR_WHITE,
                  fontWeight: 'bold'
                }}
              >
                {'Showing 10 of ' + affirmationData.length}
              </MyText>
              <Button
                iconRight={{ name: 'keyboard-arrow-right', type: 'material' }}
                onPress={() => this.pressUnlockAffirmations()}
                title="Subscribe to unlock all."
                color={COLOR_WHITE}
                fontSize={16}
                containerViewStyle={{
                  margin: 0,
                  padding: 0,
                  paddingLeft: 10
                }}
                buttonStyle={{
                  margin: 0,
                  padding: 10,
                  backgroundColor: 'transparent'
                }}
                large={false}
              />
            </View>
          ) : (
            <View />
          )}
          <View>
            <MyText
              style={[
                styles.affirmationText,
                !!affirmationData[this.affirmationNumber].author
                  ? { paddingBottom: 20 }
                  : { paddingBottom: 0 }
              ]}
            >
              {affirmationData[this.affirmationNumber].affirmation}
            </MyText>
            {!!affirmationData[this.affirmationNumber].author ? (
              <MyText style={styles.affirmationAuthor}>
                - {affirmationData[this.affirmationNumber].author} -
              </MyText>
            ) : (
              <View />
            )}
          </View>
          <View style={styles.reminder}>
            <Button
              iconRight={{ name: 'keyboard-arrow-right', type: 'material' }}
              onPress={() => this.pressGetNotifications()}
              title="Get Notifications"
              color={COLOR_WHITE}
              fontSize={16}
              buttonStyle={{
                backgroundColor: 'transparent'
              }}
              large={false}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  getBackgroundColor = function(affirmationNumber) {
    switch (affirmationNumber % 5) {
      case 0:
        return COLOR_QUATERNARY;
      case 1:
        return COLOR_SECONDARY;
      case 2:
        return COLOR_TERTIARY;
      case 3:
        return COLOR_HIGHLIGHT;
      default:
        return COLOR_PRIMARY;
    }
  };
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15
  },
  affirmationText: {
    // flex: 1,
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 24,
    padding: 15
  },
  affirmationAuthor: {
    // flex: 1,
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 16,
    padding: 15
  },
  refresh: {
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
});

function mapStateToProps(state) {
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
)(AffirmationTile);
