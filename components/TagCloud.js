import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MyText } from "../components/MyText";
import {
  COLOR_ALERT,
  COLOR_HIGHLIGHT,
  COLOR_PRIMARY,
  COLOR_QUATERNARY,
  COLOR_SECONDARY,
  COLOR_TERTIARY
} from "../styles/common";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  cloudTagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class TagCloud extends React.Component {
  constructor(props) {
    super(props);

    let pointArray = this.props.tagList.map(tag => tag.point);
    let pointMin = Math.min(...pointArray);
    let pointMax = Math.max(...pointArray);
    let pointRange = pointMax - pointMin;

    this.TagCloud = this.orderData().map((item, key) => {
      const tagContainerStyle = {
        paddingLeft: this.props.tagPaddingLeft,
        paddingTop: this.props.tagPaddingTop,
        paddingRight: this.props.tagPaddingRight,
        paddingBottom: this.props.tagPaddingBottom
      };

      let itemValue = item.point - pointMin;
      let percentile = Math.floor(itemValue / pointRange * 100);
      let itemRanking;

      if (percentile >= 95 && itemValue > 4) {
        itemRanking = 5;
      } else if (percentile >= 87 && itemValue > 3) {
        itemRanking = 4;
      } else if (percentile >= 73 && itemValue > 2) {
        itemRanking = 3;
      } else if (percentile >= 55 && itemValue > 1) {
        itemRanking = 2;
      } else if (percentile >= 30) {
        itemRanking = 1;
      } else {
        itemRanking = 0;
      }

      const tagStyle = {
        fontSize: this.props.minFontSize + itemRanking * 4,
        color: this.props.colorList[itemRanking]
      };

      return (
        <View key={key} style={tagContainerStyle}>
          <MyText style={tagStyle}>{item.title}</MyText>
        </View>
      );
    });
  }

  orderData() {
    return this.shuffle(this.props.tagList);
  }

  shuffle = function(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  getRandomPaddingLeft() {
    return Math.floor(Math.random() * this.props.tagPaddingLeft);
  }

  getRandomPaddingTop() {
    return Math.floor(Math.random() * this.props.tagPaddingTop);
  }

  getRandomPaddingRight() {
    return Math.floor(Math.random() * this.props.tagPaddingRight);
  }

  getRandomPaddingBottom() {
    return Math.floor(Math.random() * this.props.tagPaddingBottom);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.cloudTagContainer}>{this.TagCloud}</View>
      </View>
    );
  }
}

TagCloud.propTypes = {
  tagList: PropTypes.array,
  colorList: PropTypes.array,
  minFontSize: PropTypes.number,
  style: View.propTypes.style,
  tagPaddingLeft: PropTypes.number,
  tagPaddingTop: PropTypes.number,
  tagPaddingRight: PropTypes.number,
  tagPaddingBottom: PropTypes.number
};

TagCloud.defaultProps = {
  tagList: [],
  colorList: [
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_TERTIARY,
    COLOR_QUATERNARY,
    COLOR_HIGHLIGHT,
    COLOR_ALERT
  ],
  minFontSize: 12,
  tagPaddingLeft: 4,
  tagPaddingTop: 0,
  tagPaddingRight: 4,
  tagPaddingBottom: 0
};
