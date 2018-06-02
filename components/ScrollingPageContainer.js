import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { COLOR_WHITE } from "../styles/common";
import { PageContainer } from "./PageContainer";

export class ScrollingPageContainer extends React.Component {
  render() {
    return (
      <PageContainer {...this.props}>
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          {...this.props}
          style={[styles.container, this.props.style]}
        />
      </PageContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  }
});
