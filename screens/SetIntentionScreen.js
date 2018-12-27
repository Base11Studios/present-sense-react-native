import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { MyText } from '../components/MyText';
import { PageContainer } from '../components/PageContainer';
import { Title4 } from '../components/Title4';
import TutorialView from '../components/TutorialView';
import { setDailyIntention } from '../redux/reducers/tasks';
import { COLOR_HIGHLIGHT, COLOR_PRIMARY, COLOR_WHITE } from '../styles/common';

class SetIntentionScreen extends React.Component {
  static navigationOptions = {
    title: 'Set a Daily Intention'
  };

  onPressCreateOwn() {}

  onPressUseOurs(description) {
    this.props.setDailyIntention(description);
  }

  render() {
    const intentions = [
      { key: '1', id: 1, description: 'Smile at strangers' },
      { key: '2', id: 2, description: 'Be optimistic' },
      { key: '3', id: 3, description: 'Be calm and at peace' },
      { key: '4', id: 4, description: "Don't gossip about others" }
    ];

    return (
      <PageContainer>
        <TutorialView
          tutorialType="intentionIntro"
          tutorialTitle="Daily Intention"
          tutorialDescription={
            'Set an intention for the day then come back later to journal about your observations.'
          }
        />
        <MyText style={[styles.container, styles.description]}>
          We use intentions to focus our energy on one goal for the day. Refer
          to it throughout the day as a reminder, then check back in tonight to
          record your observations.
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
      </PageContainer>
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
