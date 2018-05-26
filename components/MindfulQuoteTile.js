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
      <View style={styles.header}>
        <MyText style={styles.quoteText}>
          "{quoteData[this.quoteNumber].quote}"
        </MyText>
        <MyText style={styles.quoteAuthor}>
          "-- {quoteData[this.quoteNumber].author}"
        </MyText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    flexDirection: "column",
    padding: 40,
    marginBottom: 10
  },
  quoteText: {
    flex: 1,
    textAlign: "left",
    paddingBottom: 20,
    color: COLOR_WHITE,
    fontSize: 20
  },
  quoteAuthor: {
    flex: 1,
    textAlign: "left",
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

export default connect(mapStateToProps, mapDispatchToProps)(MindfulQuoteTile);
