import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { BackButton } from "../components/BackButton";
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
        <ProgressStepper
          totalSteps={6}
          stepNumber={3}
          style={{ marginBottom: 0 }}
        />
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            marginBottom: 20
          }}
        >
          <BackButton
            {...this.props}
            color={COLOR_WHITE}
            underlayColor={COLOR_PRIMARY}
          />
        </View>
        <View
          style={{
            padding: 20,
            flex: 1,
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
        <View style={[styles.header, { flex: 5 }]}>
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 20
            }}
          >
            Let's practice mindfulness by taking 6 deep breaths through your
            nose. Focus on feeling the sensations in your nostrils as the air
            moves in and out.
          </MyText>
        </View>
        <View
          style={{
            padding: 20,
            flex: 2,
            alignItems: "center",
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
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
