import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, View } from "react-native";
import styles from "../styles/SliderEntry.style";
import { MyText } from "./MyText";

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps
    } = this.props;

    return <Image source={illustration} style={styles.image} />;
  }

  render() {
    const {
      data: { title, subtitle }
    } = this.props;

    const uppercaseTitle = title ? (
      <MyText style={[styles.title]} numberOfLines={2}>
        {title.toUpperCase()}
      </MyText>
    ) : (
      false
    );

    return (
      <View style={styles.slideInnerContainer}>
        <View style={styles.shadow} />
        <View style={[styles.imageContainer]}>
          {this.image}
          <View style={[styles.radiusMask]} />
        </View>
        <View style={[styles.textContainer]}>
          {uppercaseTitle}
          <MyText style={[styles.subtitle]} numberOfLines={3}>
            {subtitle}
          </MyText>
        </View>
      </View>
    );
  }
}
