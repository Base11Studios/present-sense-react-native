import React from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { showTutorial } from '../redux/reducers/tutorial';

class TutorialView extends React.Component {
  componentDidMount() {
    if (!this.props.tutorial[this.props.tutorialType]) {
      const buttons = [
        {
          text: 'Remind Me',
          style: 'cancel'
        }
      ];

      if (!!this.props.tutorialNavigation) {
        buttons.push({
          text: 'Take Me There!',
          onPress: () => {
            this.props.showTutorial({ type: this.props.tutorialType });
            this.props.navigation.navigate(this.props.tutorialNavigation);
          }
        });
      }

      buttons.push({
        text: 'OK',
        onPress: () =>
          this.props.showTutorial({ type: this.props.tutorialType })
      });

      Alert.alert(
        this.props.tutorialTitle,
        this.props.tutorialDescription,
        buttons,
        { cancelable: false }
      );
    }
  }

  render() {
    return <View />;
  }
}

function mapStateToProps(state, props) {
  return {
    tutorial: state.tutorial.tutorial
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showTutorial: tutorial => dispatch(showTutorial(tutorial))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialView);
