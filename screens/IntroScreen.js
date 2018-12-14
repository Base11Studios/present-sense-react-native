import React from 'react';
import { Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { MyText } from '../components/MyText';
import { ProgressStepper } from '../components/ProgressStepper';
import { ScrollingPageContainer } from '../components/ScrollingPageContainer';
import { COLOR_PRIMARY, COLOR_WHITE } from '../styles/common';

export default class IntroScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate('IntroOverview');
  }

  render() {
    return (
      <ScrollingPageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        <ProgressStepper totalSteps={6} stepNumber={1} />
        <View
          style={{
            padding: verticalScale(20),
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            style={{ width: scale(90), height: scale(90) }}
            source={require('../assets/images/icon.png')}
          />
        </View>

        <View style={styles.header}>
          <MyText
            style={{
              marginTop: verticalScale(10),
              marginBottom: verticalScale(24),
              color: COLOR_WHITE,
              fontSize: verticalScale(20)
            }}
          >
            Welcome to Present Sense. An app that teaches you to experience the
            joy in everyday moments. Let's make you: present.
          </MyText>
        </View>
        <View
          style={{
            padding: verticalScale(20),
            // flex: 2,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            iconRight={{
              name: 'keyboard-arrow-right',
              type: 'material',
              style: { fontSize: verticalScale(24) }
            }}
            onPress={() => this.pressNext()}
            title="Start Tutorial"
            color={COLOR_WHITE}
            buttonStyle={{
              backgroundColor: COLOR_PRIMARY
            }}
            fontSize={verticalScale(18)}
            large={true}
          />
        </View>
      </ScrollingPageContainer>
    );
  }
}

const styles = ScaledSheet.create({
  header: {
    padding: '20@vs',
    // flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});
