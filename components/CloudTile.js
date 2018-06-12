import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { COLOR_WHITE } from "../styles/common";
import TagCloud from "./TagCloud";
import { Title5 } from "./Title5";
var removeWords = require("remove-words");

class CloudTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feelingTagList: this.getFilteredWordCounts(props.tasksCompleted, "feel"),
      senseTagList: this.getFilteredWordCounts(props.tasksCompleted, "prompt"),
      minFontSize: 12,
      style: {
        paddingLeft: 0,
        paddingRight: 0
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateLists(nextProps);
  }

  updateLists(nextProps) {
    this.setState({
      feelingTagList: this.getFilteredWordCounts(
        nextProps.tasksCompleted,
        "feel"
      ),
      senseTagList: this.getFilteredWordCounts(
        nextProps.tasksCompleted,
        "prompt"
      ),
      minFontSize: 12,
      style: {
        paddingLeft: 0,
        paddingRight: 0
      }
    });
  }

  // TODO cap the list items at like 30?

  getFilteredWordCounts(completedTasks, type) {
    let wordArray = [];
    let tagMap = {};
    let tagList = [];
    completedTasks.map(completedTask => {
      if (type === "feel") {
        wordArray.push(
          ...removeWords(
            completedTask.formValues.feel
              .replace(/[.,\/#!;:()]/g, "")
              .replace(/\s{2,}/g, " ")
              .replace(/\n|\r|\t/g, " "),
            false
          )
        );
      } else {
        wordArray.push(
          ...removeWords(
            completedTask.formValues.prompt
              .replace(/[.,\/#!;:()]/g, "")
              .replace(/\s{2,}/g, " ")
              .replace(/\n|\r|\t/g, " "),
            false
          )
        );
      }
    });

    wordArray.forEach(word => {
      if (!tagMap[word]) {
        tagMap[word] = 1;
      } else {
        tagMap[word] = tagMap[word] + 1;
      }
    });

    for (var property in tagMap) {
      if (tagMap.hasOwnProperty(property)) {
        tagList.push({
          title: property,
          point: tagMap[property]
        });
      }
    }

    if (tagList.length > 50) {
      tagList.sort(function(b, a) {
        const keyA = a.point,
          keyB = b.point;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      tagList = tagList.slice(0, 50);
    }

    return tagList;
  }

  render() {
    const { tasksCompleted } = this.props;

    return (
      <View style={styles.header}>
        <Title5 style={styles.promptTitle}>Sense Cloud</Title5>
        <TagCloud
          tagList={this.state.senseTagList}
          colorList={this.state.colorList}
          minFontSize={this.state.minFontSize}
          style={this.state.style}
        />
        <Title5 style={styles.feelingsTitle}>Feeling Cloud</Title5>
        <TagCloud
          tagList={this.state.feelingTagList}
          colorList={this.state.colorList}
          minFontSize={this.state.minFontSize}
          style={this.state.style}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR_WHITE,
    padding: 20,
    paddingTop: 5
  },
  feelingsTitle: {
    marginTop: 20,
    marginBottom: 6
  },
  promptTitle: {
    marginBottom: 6
  },
  stat: {
    flex: 1,
    alignItems: "center"
  },
  statLabel: {
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    tasksCompleted: state.tasks.completedTasks
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloudTile);
