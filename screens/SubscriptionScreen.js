import React from "react";
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import * as RNIap from "react-native-iap";
import { connect } from "react-redux";
import { MyText } from "../components/MyText";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { SubscribeCarousel } from "../components/SubscribeCarousel";
import { Title4 } from "../components/Title4";
import { Title5 } from "../components/Title5";
import { subscribeUser, updateIAPs, updateUserSubscriptions } from "../redux/reducers/subscription";
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_WHITE } from "../styles/common";

class SubscriptionScreen extends React.Component {
  componentDidMount() {
    if (!this.props.monthlyProduct || !this.props.yearlyProduct) {
      this.props.updateIAPs();
    }
  }

  buySubscribeItem = async sku => {
    try {
      const purchase = await RNIap.buySubscription(sku);
      this.setState({ receipt: purchase.transactionReceipt }, () => {
        this.props.subscribeUser();
      });
    } catch (err) {
      Alert.alert("Something went wrong! Please try again.");
    }
  };

  // TODO - OK?? Was componentWillReceiveProps
  componentDidUpdate(prevProps) {
    if (!!prevProps.premium) {
      this.props.navigation.navigate("Settings");
    }
  }

  onPressTerms() {
    this.props.navigation.navigate("Terms");
  }

  onPressPrivacy() {
    this.props.navigation.navigate("Privacy");
  }

  onPressRestore() {
    this.props.updateUserSubscriptions({ userDriven: true });
  }

  onPressPurchaseMonthly() {
    if (!!this.props.monthlyProduct && !!this.props.monthlyProduct.productId) {
      this.buySubscribeItem(this.props.monthlyProduct.productId);
    } else {
      this.props.updateIAPs();
    }
  }

  onPressPurchaseYearly() {
    if (!!this.props.yearlyProduct && !!this.props.yearlyProduct.productId) {
      this.buySubscribeItem(this.props.yearlyProduct.productId);
    } else {
      this.props.updateIAPs();
    }
  }

  render() {
    const { yearlyProduct, monthlyProduct, receipt, availableItemsMessage, discount } = this.props;

    return (
      <ScrollingPageContainer>
        <Title4 style={styles.title}>SUBSCRIBE TO PREMIUM</Title4>

        <SubscribeCarousel />

        <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
          <TouchableOpacity onPress={() => this.onPressPurchaseMonthly()}>
            <View
              style={{
                flex: 1,
                padding: 18,
                margin: 14,
                marginBottom: 7,
                borderRadius: 6,
                backgroundColor: COLOR_SECONDARY,
                flexDirection: "column"
              }}
            >
              <Title5 style={{ color: COLOR_WHITE }}>MONTHLY </Title5>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <MyText style={{ fontSize: 16, color: COLOR_WHITE }}>
                  {!!monthlyProduct && !!monthlyProduct.monthlyFormat ? monthlyProduct.monthlyFormat + " / month" : "N/A"}
                </MyText>
                {!!monthlyProduct && !!monthlyProduct.trial ? (
                  <View>
                    <MyText
                      style={{
                        fontSize: 14,
                        color: COLOR_WHITE,
                        fontWeight: "600"
                      }}
                    >
                      {monthlyProduct.trial.toLowerCase()} free trial
                    </MyText>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressPurchaseYearly()}>
            <View
              style={{
                flex: 1,
                padding: 18,
                margin: 14,
                marginTop: 7,
                borderRadius: 6,
                backgroundColor: COLOR_PRIMARY,
                flexDirection: "column"
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <Title5 style={{ color: COLOR_WHITE }}>YEARLY </Title5>
                <View>
                  <MyText
                    style={{
                      fontSize: 14,
                      color: COLOR_WHITE,
                      fontWeight: "bold"
                    }}
                  >
                    {!!discount ? discount + "% OFF" : ""}
                  </MyText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <MyText style={{ fontSize: 16, color: COLOR_WHITE }}>
                  {!!yearlyProduct && !!yearlyProduct.yearlyFormat ? yearlyProduct.yearlyFormat + " / year" : "N/A"}
                </MyText>
                {!!yearlyProduct && !!yearlyProduct.trial ? (
                  <View>
                    <MyText
                      style={{
                        fontSize: 14,
                        color: COLOR_WHITE,
                        fontWeight: "600"
                      }}
                    >
                      {yearlyProduct.trial.toLowerCase()} free trial
                    </MyText>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.legalContainer}>
          <MyText>Recurring billing. Cancel anytime.</MyText>
          <View style={styles.termsContainer}>
            <TouchableOpacity onPress={() => this.onPressTerms()}>
              <MyText style={styles.termsText}>Terms & Conditions</MyText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressPrivacy()}>
              <MyText style={styles.termsText}>Privacy Policy</MyText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.onPressRestore()}>
            <MyText style={styles.restoreText}>Restore Purchase</MyText>
          </TouchableOpacity>
        </View>
        {Platform.OS === "ios" ? (
          <View style={styles.subscribe}>
            <MyText style={styles.text}>
              Payment will be charged to your iTunes account at confirmation of purchase. Subscription automatically renews unless
              auto-renew is turned off at least 24-hours before the end of the current period. Account will be charged for renewal within
              24-hours prior to the end of the current period.
            </MyText>
            <MyText style={styles.text}>
              Subscriptions may be managed by the user and auto-renewal may be turned off by going to the user’s Account Settings after
              purchase.
            </MyText>
            <MyText style={styles.text}>
              Any unused portion of a free trial period, if offered, will be forfeited when the user purchases a subscription to that
              publication, where applicable.
            </MyText>
          </View>
        ) : (
          <View style={styles.subscribe}>
            <MyText style={styles.text}>
              Payment will be charged to your Google Play account at confirmation of purchase. Subscription automatically renews unless
              auto-renew is turned off.
            </MyText>
            <MyText style={styles.text}>Subscriptions may be managed by the user by going to Google Play after purchase.</MyText>
          </View>
        )}
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    justifyContent: "center"
  },
  subscribe: {
    padding: 16
  },
  text: {
    paddingBottom: 16
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
  restoreText: {
    marginBottom: 10,
    color: COLOR_PRIMARY
  }
});

function mapStateToProps(state, ownProps) {
  return {
    premium: state.subscription.premium,
    monthlyProduct: state.subscription.monthlyProduct,
    yearlyProduct: state.subscription.yearlyProduct,
    discount: state.subscription.discount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    subscribeUser: () => dispatch(subscribeUser()),
    updateUserSubscriptions: data => dispatch(updateUserSubscriptions(data)),
    updateIAPs: () => dispatch(updateIAPs())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionScreen);
