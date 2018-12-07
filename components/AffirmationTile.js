import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { quoteData } from '../redux/reducers/quote-data';
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
  quoteNumber = this.getRandomQuoteNumber();

  getNewAffirmation() {
    this.quoteNumber = this.getRandomQuoteNumber();
    this.forceUpdate();
  }

  getRandomQuoteNumber() {
    return Math.floor(Math.random() * quoteData.length);
  }

  render() {
    return (
      <View
        style={[
          styles.header,
          { backgroundColor: this.getBackgroundColor(this.quoteNumber) }
        ]}
      >
        <View>
          <MyText
            style={[
              styles.quoteText,
              !!quoteData[this.quoteNumber].author
                ? { paddingBottom: 20 }
                : { paddingBottom: 0 }
            ]}
          >
            {quoteData[this.quoteNumber].quote}
          </MyText>
          {!!quoteData[this.quoteNumber].author ? (
            <MyText style={styles.quoteAuthor}>
              - {quoteData[this.quoteNumber].author} -
            </MyText>
          ) : (
            <View />
          )}
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
        </View>
      </View>
    );
  }

  getBackgroundColor = function(quoteNumber) {
    switch (quoteNumber % 5) {
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
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30
  },
  quoteText: {
    // flex: 1,
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 18
  },
  quoteAuthor: {
    // flex: 1,
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 16
  },
  refresh: {
    alignItems: 'flex-end',
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20
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
