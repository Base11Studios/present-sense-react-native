import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { MyText } from '../components/MyText';
import { ScrollingPageContainer } from '../components/ScrollingPageContainer';
import { Title4 } from '../components/Title4';
import { setDailyIntention } from '../redux/reducers/tasks';
import { COLOR_HIGHLIGHT, COLOR_PRIMARY, COLOR_WHITE } from '../styles/common';

class SetIntentionScreen extends React.Component {
  static navigationOptions = {
    title: 'Set a Daily Intention'
  };

  onPressCreateOwn() {
    this.props.navigation.navigate('CustomDailyIntention');
  }

  onPressUseOurs(description) {
    this.props.setDailyIntention(description);
    this.props.navigation.navigate('Home');
  }

  render() {
    const intentions = [
      { key: '1', id: 1, description: 'Be in the present' },
      { key: '2', id: 2, description: 'Smile at strangers' },
      { key: '3', id: 3, description: 'Be optimistic' },
      { key: '4', id: 4, description: 'Be calm and at peace' },
      { key: '5', id: 5, description: 'Listen intently to others' },
      { key: '6', id: 6, description: 'Do 3 acts of kindness' },
      { key: '7', id: 7, description: 'Take deep breaths when stressed out' },
      { key: '8', id: 8, description: 'Give 3 compliments' },
      { key: '9', id: 9, description: 'Pay attention to nature' },
      { key: '10', id: 10, description: 'See the good in others' },
      { key: '11', id: 11, description: 'Walk mindfully throughout the day' },
      { key: '12', id: 12, description: 'Be confident' },
      { key: '13', id: 13, description: 'Take feedback with grace' },
      { key: '14', id: 14, description: 'Be physically active' },
      { key: '15', id: 15, description: 'Be energized' },
      { key: '16', id: 16, description: 'Be a leader' },
      { key: '17', id: 17, description: 'Appreciate what I have' },
      { key: '18', id: 18, description: 'Take time for me' }
    ];

    return (
      <ScrollingPageContainer>
        <MyText style={[styles.container, styles.description]}>
          We use intentions to focus our energy on one goal for the day. Refer
          to it throughout the day as a reminder, then check-in at the end of
          the day to record your observations.
        </MyText>
        <Title4 style={[styles.container, styles.title]}>
          CREATE YOUR OWN
        </Title4>
        <TouchableOpacity onPress={() => this.onPressCreateOwn()}>
          <View style={[styles.card, { backgroundColor: COLOR_HIGHLIGHT }]}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <MyText
                style={{
                  textAlign: 'center',
                  color: COLOR_WHITE,
                  fontSize: 18,
                  fontWeight: '600'
                }}
              >
                Create your own intention
              </MyText>
            </View>
          </View>
        </TouchableOpacity>
        <Title4 style={[styles.container, styles.title]}>
          CHOOSE FROM OUR SUGGESTIONS
        </Title4>
        <FlatList
          style={styles.flatList}
          data={intentions}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.onPressUseOurs(item.description)}
            >
              <View style={[styles.card, { backgroundColor: COLOR_PRIMARY }]}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <MyText
                    style={{
                      textAlign: 'center',
                      color: COLOR_WHITE,
                      fontSize: 18,
                      fontWeight: '600'
                    }}
                  >
                    {item.description}
                  </MyText>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
  },
  title: {
    marginTop: 18,
    marginBottom: 6
  },
  description: {
    marginTop: 18,
    marginBottom: 6
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 8,
    borderRadius: 6,
    backgroundColor: COLOR_PRIMARY,
    flexDirection: 'row',
    alignItems: 'center'
  },
  flatList: {}
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setDailyIntention: intention => dispatch(setDailyIntention(intention))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetIntentionScreen);
