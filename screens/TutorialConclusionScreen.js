import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { DismissButton } from "../components/DismissButton";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { ProgressStepper } from "../components/ProgressStepper";
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
  }

  render() {
    const { activeTask } = this.props;
    return (
      <PageContainer style={{ backgroundColor: COLOR_TERTIARY }}>
        <ProgressStepper
          totalSteps={8}
          stepNumber={8}
          style={{ marginBottom: 0 }}
        />
        <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
          <DismissButton
            color={COLOR_WHITE}
            {...this.props}
            resetRoute="Tutorial"
          />
        </View>
        <View
          style={{
            padding: 20,
            height: 180,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <MyText />
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
            height: 180,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Button
            iconRight={{ name: "keyboard-arrow-right", type: "material" }}
            onPress={() => this.pressNext()}
            title="Tutorial, Completed"
            color={COLOR_WHITE}
            buttonStyle={{
              backgroundColor: COLOR_TERTIARY
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
