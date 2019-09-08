import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { DismissButton } from "../components/DismissButton";
import { MyText } from "../components/MyText";
import { ProgressStepper } from "../components/ProgressStepper";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { showTutorial } from "../redux/reducers/tutorial";
import { COLOR_TERTIARY, COLOR_WHITE } from "../styles/common";

class TutorialConclusionScreen extends React.Component {
  pressNext() {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Tutorial",
            params: {}
          })
        ]
      })
    );

    this.props.navigation.dispatch(NavigationActions.back());
    this.props.navigation.navigate("Profile");
  }

  render() {
    const { activeTask } = this.props;
    return (
      <ScrollingPageContainer style={{ backgroundColor: COLOR_TERTIARY }}>
        <ProgressStepper totalSteps={8} stepNumber={8} style={{ marginBottom: 0 }} />
        <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
          <DismissButton color={COLOR_WHITE} {...this.props} resetRoute="Tutorial" underlayColor={COLOR_TERTIARY} />
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
            {activeTask.conclusionText}
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
            title="Tutorial: Completed"
            titleStyle={{
              color: COLOR_WHITE,
              fontSize: 20
            }}
            buttonStyle={{
              backgroundColor: COLOR_TERTIARY
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
  return {
    activeTask: state.tasks.activeTask
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showTutorial: tutorial => dispatch(showTutorial(tutorial))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialConclusionScreen);
