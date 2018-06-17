import React from "react";
import { View } from "react-native";
import { COLOR_WHITE, COLOR_WHITE_TRANS } from "../styles/common";

export class ProgressStepper extends React.Component {
  render() {
    const { totalSteps, stepNumber } = this.props;
    steps = Array.from(new Array(totalSteps), function(val, i) {
      return i;
    });

    return (
      <View
        style={[
          {
            flexDirection: "row",
            marginTop: 0,
            marginBottom: 20
          },
          this.props.style
        ]}
      >
        {steps.map(stepNumIter => (
          <View
            key={stepNumIter.toString()}
            style={{
              height: 6,
              minWidth: 10,
              flex: 1,
              backgroundColor:
                stepNumIter === stepNumber - 1 ? COLOR_WHITE : COLOR_WHITE_TRANS
            }}
          />
        ))}
      </View>
    );
    // return <View />;
  }
}
