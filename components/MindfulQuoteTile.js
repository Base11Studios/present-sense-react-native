import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { quoteData } from "../redux/reducers/quote-data";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";
import { MyText } from "./MyText";

class MindfulQuoteTile extends React.Component {
  quoteNumber = Math.floor(Math.random() * quoteData.length);

  render() {
    return (
      <View
        style={[
          styles.header,
          { backgroundColor: getBackgroundColor(this.quoteNumber) }
        ]}
      >
        <MyText
          style={[
            styles.quoteText,
            !!quoteData[this.quoteNumber].author
              ? { paddingBottom: 20 }
              : { paddingBottom: 0 }
          ]}
        >
          {quoteData[this.quoteNumber].quote}
        </MyText>
        {!!quoteData[this.quoteNumber].author ? (
          <MyText style={styles.quoteAuthor}>
            - {quoteData[this.quoteNumber].author} -
          </MyText>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

getBackgroundColor = function(quoteNumber) {
  return COLOR_PRIMARY;
  // switch (quoteNumber % 5) {
  //   case 0:
  //     return COLOR_ALERT;
  //   case 1:
  //     return COLOR_SECONDARY;
  //   case 2:
  //     return COLOR_TERTIARY;
  //   case 3:
  //     return COLOR_HIGHLIGHT;
  //   default:
  //     return COLOR_PRIMARY;
  // }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    marginBottom: 10
  },
  quoteText: {
    flex: 1,
    textAlign: "center",

    color: COLOR_WHITE,
    fontSize: 18
  },
  quoteAuthor: {
    flex: 1,
    textAlign: "center",
    color: COLOR_WHITE,
    fontSize: 16
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MindfulQuoteTile);
