import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLOR_WHITE } from "../styles/common";
import { PageContainer } from "./PageContainer";

export class KeyboardAwareScrollingPageContainer extends React.Component {
  render() {
    return (
      <PageContainer {...this.props}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between"
          }}
          keyboardShouldPersistTaps={"always"}
          scrollEnabled={false}
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
