import React from "react";
import { StyleSheet } from "react-native";
import { MyText } from "../components/MyText";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";

export default class TermsAndConditions extends React.Component {
  static navigationOptions = {
    title: "Terms and Conditions"
  };

  render() {
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer style={styles.header}>
        <MyText style={styles.text}>
          Previous purchases can be restored in the settings menu.
        </MyText>
        <MyText style={styles.text}>
          Payment will be charged to your iTunes account at confirmation of
          purchase. Subscription automatically renews unless auto-renew is
          turned off at least 24-hours before the end of the current period.
          Account will be charged for renewal within 24-hours prior to the end
          of the current period.
        </MyText>
        <MyText style={styles.text}>
          Subscriptions may be managed by the user and auto-renewal may be
          turned off by going to the user’s Account Settings after purchase.
        </MyText>
        <MyText style={styles.text}>
          Any unused portion of a free trial period, if offered, will be
          forfeited when the user purchases a subscription to that publication,
          where applicable.
        </MyText>
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20
  },
  text: {
    paddingBottom: 16
  }
});
