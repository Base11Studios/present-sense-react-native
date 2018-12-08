import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { COLOR_BLACK, COLOR_WHITE } from '../styles/common';

// TODO if iOS, wrap with touch hightlight, if android wrap with https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
export class SettingsButton extends React.Component {
  render() {
    return (
      <Icon
        name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
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
            ? { marginBottom: -4, width: 25, marginRight: 9 }
            : { marginBottom: -4, width: 25, marginRight: 20 }
        }
        underlayColor={
          !!this.props.underlayColor ? this.props.underlayColor : COLOR_WHITE
        }
        type="ionicon"
        onPress={() => {
          this.props.navigation.navigate('Settings');
        }}
      />
    );
  }
}
