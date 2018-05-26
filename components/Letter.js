import React from "react";
import { MyText } from "./MyText";

export const Letter = props => {
  const { children, spacing, textStyle } = props;

  const letterStyles = [textStyle, { paddingRight: spacing }];

  return <MyText style={letterStyles}>{children}</MyText>;
};
