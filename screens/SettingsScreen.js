import React from "react";
import { Alert, FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { PURGE } from "redux-persist";
import { PageContainer } from "../components/PageContainer";
import { updateTasks } from "../redux/reducers/tasks";
import { COLOR_TERTIARY, COLOR_WHITE } from "../styles/common";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  constructor(props) {
    super(props);
  }

  onPressResetStore() {
    const { dispatch } = this.props;

    Alert.alert(
      "Are You Sure?",
      "Clearing data will reset the application back to its defaults. You will lose all of your progress.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Clear Data",
          onPress: () => {
            dispatch({
              type: PURGE,
              key: "root",
              result: () => {}
            });
            this.props.navigation.navigate("Home");
            this.props.updateTasks();
          }
        }
      ],
      { cancelable: false }
    );
  }

  // TODO nav back to home screen on clear

  render() {
    item1 = {
      key: "1",
      view: (
        <ListItem
          onPress={() => this.onPressResetStore()}
          title="Reset Data"
          avatar={<Icon type="evilicons" name="undo" size={24} />}
        />
      )
    };

    item2 = {
      key: "2",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("Credits")}
          title="Credits"
          avatar={
            <Icon
              type="simple-line-icon"
              name="notebook"
              size={20}
              containerStyle={{ padding: 2 }}
            />
          }
        />
      )
    };

    item4 = {
      key: "4",
      view: (
        <ListItem
          onPress={() => this.props.navigation.navigate("FAQ")}
          title="FAQ"
          avatar={
            <Icon
              type="simple-line-icon"
              name="notebook"
              size={20}
              containerStyle={{ padding: 2 }}
            />
          }
        />
      )
    };

    item3 = {
      key: "3",
      view: !this.props.premium ? (
        <ListItem
          onPress={() => this.props.navigation.navigate("Subscribe")}
          title="Unlock Premium"
          avatar={<Icon type="material" name="star-border" size={24} />}
        />
      ) : (
        <ListItem
          onPress={() => this.props.navigation.navigate("Subscribe")}
          title="Unlock Premium"
          avatar={<Icon type="material" name="star-border" size={24} />}
          chevron={false}
          disabled={true}
          badge={{
            value: "SUBSCRIBED",
            textStyle: { color: COLOR_WHITE },
            containerStyle: { backgroundColor: COLOR_TERTIARY }
          }}
        />
      )
    };

    return (
      <PageContainer>
        <FlatList
          data={[item3, item4, item2, item1]}
          renderItem={({ item }) => item.view}
        />
      </PageContainer>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    premium: state.subscription.premium
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateTasks: () => dispatch(updateTasks())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
