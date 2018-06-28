import React from "react";
import { StyleSheet } from "react-native";
import { MyText } from "../components/MyText";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";

export default class CreditsScreen extends React.Component {
  static navigationOptions = {
    title: "Credits"
  };

  render() {
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer style={styles.header}>
        <MyText>
          "Sense" icons made by Roundicons and DinosoftLabs from
          www.flaticon.com
        </MyText>
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 10
  }
});
