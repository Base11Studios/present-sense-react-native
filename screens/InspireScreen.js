import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import AffirmationTile from '../components/AffirmationTile';
import { PageContainer } from '../components/PageContainer';
import TutorialView from '../components/TutorialView';

class InspireScreen extends React.Component {
  static navigationOptions = {
    title: 'Daily Affirmations'
  };

  render() {
    const { activeTask } = this.props;

    return (
      <PageContainer>
        <TutorialView
          tutorialType="inspireIntro"
          tutorialTitle="Daily Affirmations"
          tutorialDescription={
            'Click the screen to cycle through affirmations. Setup a notification to get one every day.'
          }
        />
        <AffirmationTile {...this.props} />
      </PageContainer>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspireScreen);
