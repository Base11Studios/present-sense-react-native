/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  YellowBox
} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import RootNavigation from "./navigation/RootNavigation";
import { persistor, store } from "./redux/store";
import { COLOR_WHITE } from "./styles/common";

// TODO remove in next react-native stable version
YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated"]);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <RootNavigation />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  }
});
