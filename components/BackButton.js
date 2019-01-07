import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Colors from '../constants/Colors';
import { COLOR_BLACK, COLOR_WHITE } from '../styles/common';

// TODO if iOS, wrap with touch hightlight, if android wrap with https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
export class BackButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        style={{ flex: 1 }}
        activeOpacity={0.9}
      >
        <View
          style={{
            width: 40,
            height: 40,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 18
          }}
        >
          <Icon
            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
            size={Platform.OS === 'ios' ? 35 : 24}
            color={
              !!this.props.color
                ? this.props.color
                : Platform.OS === 'ios'
                ? Colors.tintColor
                : COLOR_BLACK
            }
            containerStyle={
              Platform.OS === 'ios'
                ? { marginTop: -7, width: 25, marginLeft: -6 }
                : { width: 25, marginLeft: -6 }
            }
            underlayColor={
              !!this.props.underlayColor
                ? this.props.underlayColor
                : COLOR_WHITE
            }
            type="ionicon"
          />
        </View>
      </TouchableOpacity>
    );
  }
}
