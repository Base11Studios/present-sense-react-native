import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { MyText } from "../components/MyText";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { SubscribeCarousel } from "../components/SubscribeCarousel";
import { Title4 } from "../components/Title4";
import {
  COLOR_DARK_GRAY,
  COLOR_PRIMARY,
  COLOR_TERTIARY,
  COLOR_WHITE
} from "../styles/common";

export default class SubscriptionScreen extends React.Component {
  onPressTerms() {
    this.props.navigation.navigate("Terms");
  }

  onPressPrivacy() {
    this.props.navigation.navigate("Privacy");
  }

  onPressRestore() {
    // TODO restore purchase
  }

  onPressPurchaseMonthly() {
    // TODO
  }

  onPressPurchaseYearly() {
    // TODO
  }

  render() {
    return (
      <ScrollingPageContainer>
        <Title4 style={styles.title}>SUBSCRIBE TO PREMIUM</Title4>

        <SubscribeCarousel />

        <View style={styles.subscribeButtons}>
          <TouchableOpacity onPress={() => this.onPressPurchaseMonthly()}>
            <View style={styles.monthlySubscribeButton}>
              <Title4
                style={{ justifyContent: "center", alignItems: "center" }}
                textStyle={styles.subscribeTitle}
              >
                MONTHLY
              </Title4>
              <MyText style={styles.price}>$12.00</MyText>
              <MyText style={styles.monthDisclaimer}>per month</MyText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressPurchaseYearly()}>
            <View style={styles.yearlySubscribeButton}>
              <Title4
                style={{ justifyContent: "center", alignItems: "center" }}
                textStyle={styles.subscribeTitle}
              >
                YEARLY
              </Title4>
              <MyText style={styles.price}>$6.00</MyText>
              <MyText style={styles.monthDisclaimer}>per month*</MyText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.legalContainer}>
          <MyText>Recurring billing. Cancel anytime.</MyText>
          <View style={styles.termsContainer}>
            {Platform.OS === "ios" ? (
              <TouchableOpacity onPress={() => this.onPressTerms()}>
                <MyText style={styles.termsText}>Terms / Conditions</MyText>
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <TouchableOpacity onPress={() => this.onPressPrivacy()}>
              <MyText style={styles.termsText}>Privacy Policy</MyText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.onPressRestore()}>
            <MyText style={styles.restoreText}>Restore Purchase</MyText>
          </TouchableOpacity>
          <MyText>* Billed as one payment</MyText>
        </View>
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    justifyContent: "center"
  },
  subscribeButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  monthDisclaimer: {
    textAlign: "center",
    color: COLOR_WHITE
  },
  price: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 12,
    color: COLOR_WHITE
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  legalContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 20
  },
  termsText: {
    margin: 10,
    color: COLOR_PRIMARY
  },
  subscribeTitle: {
    textAlign: "center",
    color: COLOR_WHITE
  },
  monthlySubscribeButton: {
    width: 130,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    backgroundColor: COLOR_DARK_GRAY
  },
  yearlySubscribeButton: {
    width: 130,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    backgroundColor: COLOR_TERTIARY
  },
  restoreText: {
    marginBottom: 10,
    color: COLOR_PRIMARY
  }
});
