import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { ProgressStepper } from "../components/ProgressStepper";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

export default class IntroActivityScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate("IntroObservations");
  }

  render() {
    return (
      <PageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        <ProgressStepper totalSteps={6} stepNumber={3} />
        <View
          style={{
            padding: 20,
            height: 180,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MyText
            style={{
              color: COLOR_WHITE,
              fontSize: 28
            }}
          >
            Try Mindfulness
          </MyText>
        </View>
        <View style={[styles.header, { flex: 1 }]}>
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 21
            }}
          >
            Let's start by taking 6 deep breaths through your nose. Focus on
            feeling the sensations in your nostrils as the air moves by. If you
            notice your mind wandering, gently bring your focus back to your
            breath.
          </MyText>
        </View>
        <View
          style={{
            padding: 20,
            height: 180,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Button
            iconRight={{ name: "keyboard-arrow-right", type: "material" }}
            onPress={() => this.pressNext()}
            title="6 Breaths, Taken"
            color={COLOR_WHITE}
            buttonStyle={{
              backgroundColor: COLOR_PRIMARY
            }}
            large={true}
          />
        </View>
      </PageContainer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flex: 1
    // alignContent: "center",
    // justifyContent: "center"
  }
});
