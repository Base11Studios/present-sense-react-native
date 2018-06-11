import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
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
            You've completed your first Mindful Experience with Present Sense!
            Do a few everyday to bring mindfulness into your daily life and
            experience every moment life has to offer.
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
            title="Mindful Experience, Completed"
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