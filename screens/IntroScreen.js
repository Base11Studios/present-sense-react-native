import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { ProgressStepper } from "../components/ProgressStepper";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

export default class IntroScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate("IntroOverview");
  }

  render() {
    return (
      <PageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        <ProgressStepper totalSteps={6} stepNumber={1} />
        <View
          style={{
            padding: 20,
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{ minWidth: 60, minHeight: 60, maxWidth: 90, maxHeight: 90 }}
            source={require("../assets/images/icon.png")}
          />
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
            Welcome to Present Sense. An app that teaches you to experience the
            joy in everyday moments. Let's make you: present.
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
            title="Start Tutorial"
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
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
