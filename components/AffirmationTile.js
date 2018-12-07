import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { affirmationData } from '../redux/reducers/affirmation-data';
import {
  COLOR_ALERT,
  COLOR_HIGHLIGHT,
  COLOR_PRIMARY,
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
    return Math.floor(Math.random() * affirmationData.length);
  }

  pressGetNotifications() {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <View
        style={[
          styles.header,
          { backgroundColor: this.getBackgroundColor(this.affirmationNumber) }
        ]}
      >
        <View style={styles.refresh}>
          <TouchableOpacity onPress={() => this.getNewAffirmation()}>
            <Icon
              type="material"
              color={COLOR_WHITE}
              name="refresh"
              size={30}
            />
          </TouchableOpacity>
        </View>
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
              backgroundColor: this.getBackgroundColor(this.affirmationNumber)
            }}
            large={false}
          />
        </View>
      </View>
    );
  }

  getBackgroundColor = function(affirmationNumber) {
    switch (affirmationNumber % 5) {
      case 0:
        return COLOR_ALERT;
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
    alignItems: 'flex-end',
    alignSelf: 'stretch'
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AffirmationTile);
