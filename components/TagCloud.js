import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import { MyText } from "../components/MyText";
import { COLOR_ALERT, COLOR_HIGHLIGHT, COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from "../styles/common";

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
    this.state = getState(this.props, false);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getState(nextProps);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.cloudTagContainer}>{this.state.TagCloud}</View>
      </View>
    );
  }
}

TagCloud.propTypes = {
  tagList: PropTypes.array,
  colorList: PropTypes.array,
  minFontSize: PropTypes.number,
  style: ViewPropTypes.style,
  tagPaddingLeft: PropTypes.number,
  tagPaddingTop: PropTypes.number,
  tagPaddingRight: PropTypes.number,
  tagPaddingBottom: PropTypes.number
};

TagCloud.defaultProps = {
  tagList: [],
  colorList: [COLOR_PRIMARY, COLOR_SECONDARY, COLOR_TERTIARY, COLOR_QUATERNARY, COLOR_HIGHLIGHT, COLOR_ALERT],
  minFontSize: 12,
  tagPaddingLeft: 4,
  tagPaddingTop: 0,
  tagPaddingRight: 4,
  tagPaddingBottom: 0
};

function orderData(props) {
  return shuffle(props.tagList);
}

function shuffle(array) {
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
}

function getState(props, forceUpdate) {
  let pointArray = props.tagList.map(tag => tag.point);
  let pointMin = Math.min(...pointArray);
  let pointMax = Math.max(...pointArray);
  let pointRange = pointMax - pointMin;

  return {
    TagCloud: orderData(props).map((item, key) => {
      const tagContainerStyle = {
        paddingLeft: props.tagPaddingLeft,
        paddingTop: props.tagPaddingTop,
        paddingRight: props.tagPaddingRight,
        paddingBottom: props.tagPaddingBottom
      };

      let itemValue = item.point - pointMin;
      let percentile = Math.floor((itemValue / pointRange) * 100);
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
        fontSize: props.minFontSize + itemRanking * 4,
        color: props.colorList[itemRanking]
      };

      return (
        <View key={key} style={tagContainerStyle}>
          <MyText style={tagStyle}>{item.title}</MyText>
        </View>
      );
    })
  };

  // if (!!forceUpdate) {
  //   this.forceUpdate();
  // }
}
