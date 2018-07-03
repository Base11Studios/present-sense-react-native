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

class TutorialHelperScreen extends React.Component {
  pressNext() {
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.number === 4) {
        this.props.navigation.navigate("TutorialActivity");
      } else {
        this.props.navigation.navigate(
          "TutorialHelper" +
            this.props.navigation.state.params.number.toString(),
          { number: this.props.navigation.state.params.number + 1 }
        );
      }
    }
  }

  render() {
    const { activeTask } = this.props;
    const helpNumber =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.number
        ? this.props.navigation.state.params.number
        : 0;
    return (
      <ScrollingPageContainer style={{ backgroundColor: COLOR_TERTIARY }}>
        <ProgressStepper
          totalSteps={8}
          stepNumber={this.props.navigation.state.params.number}
          style={{ marginBottom: 0 }}
        />
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20
          }}
        >
          <BackButton
            {...this.props}
            color={COLOR_WHITE}
            underlayColor={COLOR_TERTIARY}
          />
          <DismissButton
            color={COLOR_WHITE}
            {...this.props}
            resetRoute="DoTask"
            underlayColor={COLOR_TERTIARY}
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
            {activeTask.helperText[helpNumber - 1]}
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
            title="Continue"
            color={COLOR_WHITE}
            buttonStyle={{
              backgroundColor: COLOR_TERTIARY
            }}
            large={true}
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialHelperScreen);
