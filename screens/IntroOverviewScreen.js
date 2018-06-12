import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

export default class IntroOverviewScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate("IntroActivity");
  }

  render() {
    return (
      <PageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        <View
          style={{
            padding: 20,
            height: 180,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{ width: 140, height: 140 }}
            source={require("../assets/images/icon.png")}
          />
        </View>

        <View style={styles.header}>
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 21
            }}
          >
            Present Sense uses Mindfulness to teach you to experience the world
            around you. Mindfulness is the ability to be aware of where we are
            and what we're doing in the present moment.
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
            title="Let's Start"
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
    alignContent: "center",
    justifyContent: "center"
  }
});
