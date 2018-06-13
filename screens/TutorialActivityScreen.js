import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

class TutorialActivityScreen extends React.Component {
  pressNext() {
    this.props.navigation.navigate("TutorialObservations");
  }

  render() {
    const { activeTask } = this.props;
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
        <View style={[styles.header, { flex: 1 }]}>
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 21
            }}
          >
            {activeTask.activityText}
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
            title="Activity, Done"
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
    flex: 1
    // alignContent: "center",
    // justifyContent: "center"
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
