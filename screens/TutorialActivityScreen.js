import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { DismissButton } from "../components/DismissButton";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { ProgressStepper } from "../components/ProgressStepper";
import { COLOR_TERTIARY, COLOR_WHITE } from "../styles/common";

class TutorialActivityScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate("TutorialObservations");
  }

  render() {
    const { activeTask } = this.props;
    return (
      <PageContainer style={{ backgroundColor: COLOR_TERTIARY }}>
        <ProgressStepper
          totalSteps={8}
          stepNumber={5}
          style={{ marginBottom: 0 }}
        />
        <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
          <DismissButton
            color={COLOR_WHITE}
            {...this.props}
            resetRoute="Tutorial"
            underlayColor={COLOR_TERTIARY}
          />
        </View>
        <View
          style={{
            padding: 20,
            height: 100,
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
            Begin Experience
          </MyText>
        </View>
        <View style={[styles.header, { flex: 1 }]}>
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
            height: 180,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            iconRight={{ name: "keyboard-arrow-right", type: "material" }}
            onPress={() => this.pressNext()}
            title="Experience, Done"
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialActivityScreen);
