import {
  COLOR_ALERT,
  COLOR_ALERT_LIGHT,
  COLOR_HIGHLIGHT,
  COLOR_HIGHLIGHT_LIGHT,
  COLOR_PRIMARY,
  COLOR_PRIMARY_LIGHT,
  COLOR_SECONDARY,
  COLOR_SECONDARY_LIGHT,
  COLOR_TERTIARY
} from "../styles/common";

export const getBackgroundColorByDay = function(day) {
  return day === "Day"
    ? COLOR_ALERT
    : day === "Morning"
      ? COLOR_PRIMARY
      : day === "Anytime"
        ? COLOR_SECONDARY
        : day === "Evening"
          ? COLOR_HIGHLIGHT
          : day === "Tutorial"
            ? COLOR_TERTIARY
            : "";
};

export const getLightBackgroundColorByDay = function(day) {
  return day === "Day"
    ? COLOR_ALERT_LIGHT
    : day === "Morning"
      ? COLOR_PRIMARY_LIGHT
      : day === "Anytime"
        ? COLOR_SECONDARY_LIGHT
        : day === "Evening"
          ? COLOR_HIGHLIGHT_LIGHT
          : "";
};
