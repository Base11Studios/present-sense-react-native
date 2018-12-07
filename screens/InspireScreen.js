import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import AffirmationTile from '../components/AffirmationTile';
import { PageContainer } from '../components/PageContainer';

class InspireScreen extends React.Component {
  static navigationOptions = {
    title: 'Inspiration'
  };

  render() {
    const { activeTask } = this.props;

    return (
      <PageContainer>
        <AffirmationTile />
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
