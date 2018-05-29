import {
  COLOR_ALERT,
  COLOR_HIGHLIGHT,
  COLOR_PRIMARY,
  COLOR_QUATERNARY,
  COLOR_SECONDARY,
  COLOR_TERTIARY
} from "../styles/common";

export const getFocusTypeColor = function(focusType) {
  return focusType === "Sound"
    ? COLOR_PRIMARY
    : focusType === "Sight"
      ? COLOR_HIGHLIGHT
      : focusType === "Touch"
        ? COLOR_ALERT
        : focusType === "Smell"
          ? COLOR_TERTIARY
          : focusType === "Taste"
            ? COLOR_SECONDARY
            : focusType === "Mind"
              ? COLOR_QUATERNARY
              : "";
};
