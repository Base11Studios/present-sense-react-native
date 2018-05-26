import { Dimensions, Platform, StyleSheet } from "react-native";
import { COLOR_BLACK, COLOR_DARK_GRAY, COLOR_WHITE } from "./common";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = percentage * viewportWidth / 100;
  return Math.round(value);
}

const slideHeight = 240;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 0 // needed for shadow
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: COLOR_BLACK,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    width: itemWidth,
    height: slideHeight - 75
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "white"
  },
  radiusMaskEven: {
    backgroundColor: COLOR_BLACK
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 0,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: COLOR_BLACK
  },
  title: {
    color: COLOR_BLACK,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  titleEven: {
    color: COLOR_WHITE
  },
  subtitle: {
    marginTop: 6,
    color: COLOR_DARK_GRAY,
    fontSize: 12,
    fontStyle: "italic"
  },
  subtitleEven: {
    color: "rgba(255, 255, 255, 0.7)"
  }
});
