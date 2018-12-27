import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { MyText } from '../components/MyText';
import { PageContainer } from '../components/PageContainer';
import { Title4 } from '../components/Title4';
import TutorialView from '../components/TutorialView';
import { COLOR_PRIMARY } from '../styles/common';

class SetIntentionScreen extends React.Component {
  static navigationOptions = {
    title: 'Daily Intention'
  };

  onPressCreateOwn() {}

  onPressUseOurs(description) {}

  render() {
    const intentions = [
      { id: 1, description: 'Smile at strangers' },
      { id: 2, description: 'Be optimistic' },
      { id: 3, description: 'Be calm and at peace' },
      { id: 4, description: "Don't gossip about others" }
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
        <Title4>Set today's intention</Title4>
        <MyText>
          We use intentions to focus our energy on one goal for the day. Refer
          to it throughout the day as a reminder, then check back in tonight to
          record your observations.
        </MyText>
        <TouchableOpacity onPress={() => this.onPressCreateOwn()}>
          <View style={[styles.card, { backgroundColor: COLOR_PRIMARY }]}>
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
                Create your own intention
              </MyText>
            </View>
          </View>
        </TouchableOpacity>
        <Title4>Or choose from one of our suggestions</Title4>
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
                      fontWeight: '600',
                      marginRight: 28
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetIntentionScreen);
