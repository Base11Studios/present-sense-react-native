import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { BackButton } from "../components/BackButton";
import { DismissButton } from "../components/DismissButton";
import { MyText } from "../components/MyText";
import { ProgressStepper } from "../components/ProgressStepper";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { COLOR_TERTIARY, COLOR_WHITE } from "../styles/common";

class TutorialActivityScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate("TutorialObservations");
  }

  render() {
    const { activeTask } = this.props;
    return (
      <ScrollingPageContainer style={{ backgroundColor: COLOR_TERTIARY }}>
        <ProgressStepper totalSteps={8} stepNumber={5} style={{ marginBottom: 0 }} />
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20
          }}
        >
          <View>
            <BackButton {...this.props} color={COLOR_WHITE} underlayColor={COLOR_TERTIARY} />
          </View>
          <View>
            <DismissButton color={COLOR_WHITE} {...this.props} resetRoute="DoTask" underlayColor={COLOR_TERTIARY} />
          </View>
        </View>
        <View
          style={{
            padding: 20,
            // flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start"
          }}
        >
          <MyText
            style={{
              color: COLOR_WHITE,
              fontSize: 28
            }}
          >
            Begin Experience
          </MyText>
        </View>
        <View style={[styles.header]}>
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 20
            }}
          >
            {activeTask.activityText}
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
            title="Experience: Done"
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
    // flex: 1,
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialActivityScreen);
