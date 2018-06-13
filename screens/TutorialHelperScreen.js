import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

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
      <PageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
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
              fontSize: 21
            }}
          >
            {activeTask.helperText[helpNumber - 1]}
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
            title="Continue"
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
