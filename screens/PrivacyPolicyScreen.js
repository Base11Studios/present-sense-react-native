import React from "react";
import { StyleSheet } from "react-native";
import { MyText } from "../components/MyText";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";

export default class PrivacyPolicyScreen extends React.Component {
  static navigationOptions = {
    title: "Privacy Policy"
  };

  render() {
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer style={styles.header}>
        <MyText style={styles.text}>
          Present Sense does not collect any of your response data or store it
          off your device. All your data is stored locally on your phone.
        </MyText>
        <MyText style={styles.text}>
          Present Sense may track your usage of the application anonymously so
          that we can improve the product. We will not attempt to identify you
          by name for any of our analytics.
        </MyText>
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 10
  },
  text: {
    paddingBottom: 16
  }
});
