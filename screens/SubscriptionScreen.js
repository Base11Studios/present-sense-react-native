import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import * as RNIap from "react-native-iap";
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
var currencyFormatter = require("currency-formatter");

const yearlySubId = "presmo.subscription.premium.yearly";
const monthlySubId = "presmo.subscription.premium.monthly";

const itemSkus = Platform.select({
  ios: [monthlySubId, yearlySubId],
  android: [monthlySubId, yearlySubId]
});

export default class SubscriptionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      monthlyProduct: null,
      yearlyProduct: null,
      receipt: "",
      availableItemsMessage: ""
    };
  }

  async componentDidMount() {
    try {
      await RNIap.prepare();
      this.getSubscribeItems();
    } catch (err) {
      console.warn(err.code, err.message);
      // TODO set button or give alert
    }
  }

  getSubscribeItems = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      const subs = await RNIap.getSubscriptions(itemSkus);
      let yearlyProduct = null;
      let monthlyProduct = null;
      let discount = null;
      products.forEach(product => {
        if (product.productId === yearlySubId) {
          yearlyProduct = product;
          yearlyProduct.monthlyFormat = currencyFormatter.format(
            yearlyProduct.price / 12,
            { code: yearlyProduct.currency }
          );
        } else if (product.productId === monthlySubId) {
          monthlyProduct = product;
          monthlyProduct.monthlyFormat = currencyFormatter.format(
            monthlyProduct.price,
            { code: monthlyProduct.currency }
          );
        }
      });
      if (
        !!yearlyProduct &&
        !!yearlyProduct.price &&
        !!monthlyProduct &&
        !!monthlyProduct.price
      ) {
        discount =
          100 -
          Math.round(yearlyProduct.price / (monthlyProduct.price * 12) * 100);
      }
      this.setState({
        monthlyProduct: monthlyProduct,
        yearlyProduct: yearlyProduct,
        discount: discount
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  buySubscribeItem = async sku => {
    try {
      console.warn("buySubscribeItem: " + sku);
      const purchase = await RNIap.buySubscription(sku);
      console.info(purchase);
      this.setState({ receipt: purchase.transactionReceipt }, () =>
        this.goToNext()
      );
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  getAvailablePurchases = async () => {
    try {
      console.info(
        "Get available purchases (non-consumable or unconsumed consumable)"
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info("Available purchases :: ", purchases);
      // TODO this can be restore, check to see if product is in the list and if not, restore it
      this.setState({
        availableItemsMessage: `Got ${purchases.length} items.`,
        receipt: purchases[0].transactionReceipt
      });
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

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
    if (!!this.monthlyProduct && !!this.monthlyProduct.productId) {
      this.buySubscribeItem(this.state.monthlyProduct.productId);
    } else {
      // TODO alert? Or retry load?
    }
  }

  onPressPurchaseYearly() {
    if (!!this.monthlyProduct && !!this.monthlyProduct.productId) {
      this.buySubscribeItem(this.state.yearlyProduct.productId);
    } else {
      // TODO alert? Or retry load?
    }
  }

  render() {
    const {
      yearlyProduct,
      monthlyProduct,
      receipt,
      availableItemsMessage,
      discount
    } = this.state;
    const receipt100 = receipt.substring(0, 100);

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
              <MyText style={styles.price}>
                {!!monthlyProduct && !!monthlyProduct.monthlyFormat
                  ? monthlyProduct.monthlyFormat
                  : "N/A"}
              </MyText>
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
              <MyText style={styles.price}>
                {!!yearlyProduct && !!yearlyProduct.monthlyFormat
                  ? yearlyProduct.monthlyFormat
                  : "N/A"}
              </MyText>
              <MyText style={styles.monthDisclaimer}>*per month</MyText>
              <MyText style={styles.discount}>
                {!!discount ? discount + "% OFF" : ""}
              </MyText>
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
    color: COLOR_WHITE,
    marginBottom: 18
  },
  discount: {
    textAlign: "center",
    color: COLOR_WHITE,
    fontSize: 22,
    fontWeight: "900"
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
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
    backgroundColor: COLOR_DARK_GRAY,
    height: 150
  },
  yearlySubscribeButton: {
    width: 130,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    backgroundColor: COLOR_TERTIARY,
    height: 150
  },
  restoreText: {
    marginBottom: 10,
    color: COLOR_PRIMARY
  }
});
