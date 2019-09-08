import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { MyText } from "../components/MyText";
import { ProgressStepper } from "../components/ProgressStepper";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { showTutorial } from "../redux/reducers/tutorial";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

class IntroConclusionScreen extends React.Component {
  pressNext() {
    this.props.showTutorial({ type: "appIntro" });

    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Intro",
            params: {}
          })
        ]
      })
    );

    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <ScrollingPageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        <ProgressStepper totalSteps={6} stepNumber={6} />
        <View style={styles.header}>
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 20
            }}
          >
            You just completed your first Mindful Experience! Do a few everyday to bring mindfulness into your life and experience every
            moment life can offer.
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
            title="Experience: Completed"
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

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    showTutorial: tutorial => dispatch(showTutorial(tutorial))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroConclusionScreen);
