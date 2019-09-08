import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { MyText } from "../components/MyText";
import { ProgressStepper } from "../components/ProgressStepper";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

export default class IntroScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate("IntroOverview");
  }

  render() {
    return (
      <ScrollingPageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        <ProgressStepper totalSteps={6} stepNumber={1} />
        <View
          style={{
            padding: 20,
            // flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image style={{ width: 90, height: 90 }} source={require("../assets/images/icon.png")} />
        </View>

        <View style={styles.header}>
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 20
            }}
          >
            Welcome to Present Sense. An app that teaches you to experience the joy in everyday moments. Let's make you: present.
          </MyText>
        </View>
        <View
          style={{
            padding: 20,
            // flex: 2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            iconRight={{ name: "keyboard-arrow-right", type: "material" }}
            onPress={() => this.pressNext()}
            title="Start Tutorial"
            titleStyle={{
              color: COLOR_WHITE,
              fontSize: 20
            }}
            buttonStyle={{
              backgroundColor: COLOR_PRIMARY
            }}
          />
        </View>
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    // flex: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
