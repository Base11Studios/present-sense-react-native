import { withFormik } from "formik";
import React, { Component } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import Yup from "yup";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";
import { ErrorText } from "../components/ErrorText";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { completeTask } from "../redux/reducers/tasks";
import {
  getTaskStreak,
  getTotalTasksCompleted
} from "../redux/selectors/index";
// TODO persist answers if going back to Task Overview screen

// Our inner form component. Will be wrapped with Formik({..})
const InnerCompleteTaskForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  const { task } = props.navigation.state.params;

  const promptErrors =
    !!touched.prompt && !!errors.prompt ? (
      <ErrorText style={{ marginBottom: 20 }}>{errors.prompt}</ErrorText>
    ) : (
      <View />
    );

  const feelErrors =
    !!touched.feel && !!errors.feel ? (
      <ErrorText style={{ marginBottom: 26 }}>{errors.feel}</ErrorText>
    ) : (
      <View style={{ marginBottom: 26 }} />
    );

  state = { promptInputHeight: 20, feelInputHeight: 20 };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollingPageContainer>
        {/* <TutorialView
          tutorialType="taskRecodingIntro"
          tutorialTitle="Journal About What You Noticed"
          tutorialDescription={
            "If you haven't done the experience yet, go back and finish it. Now, write the things you noticed and how you're feeling. We'll store this so you can view it later."
          }
        /> */}
        <PageContainer>
          <Card title={task.title}>
            <View style={{ marginBottom: 16 }}>
              <MyText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginBottom: 12
                }}
              >
                {task.prompt}
              </MyText>
              <AutoExpandingTextInput
                onChangeText={text => props.setFieldValue("prompt", text)}
                value={props.values.prompt}
              />
              {promptErrors}
            </View>
            <View style={{ marginBottom: 16 }}>
              <MyText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginBottom: 10
                }}
              >
                How do you feel?
              </MyText>
              <AutoExpandingTextInput
                onChangeText={text => props.setFieldValue("feel", text)}
                value={props.values.feel}
              />
              {feelErrors}
            </View>
            <View>
              <PrimaryButton onPress={props.handleSubmit} title="SUBMIT" />
            </View>
          </Card>
        </PageContainer>
      </ScrollingPageContainer>
    </TouchableWithoutFeedback>
  );
};

completeTheTask = function(values, props) {
  props.completeTask({
    task: props.navigation.state.params.task,
    formValues: { prompt: values.prompt, feel: values.feel }
  });

  props.navigation.navigate("Journey");
};

const CompleteTaskForm = withFormik({
  mapPropsToValues: () => ({ prompt: "", feel: "" }),
  validationSchema: Yup.object().shape({
    prompt: Yup.string().required("Response is required!"),
    feel: Yup.string().required("Reponse is required!")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    completeTheTask(values, props);
  },
  displayName: "BasicForm" // helps with React DevTools
})(InnerCompleteTaskForm);

class RecordingTaskScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {};
  };

  render() {
    return <CompleteTaskForm {...this.props} />;
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {
    totalTasksCompleted: getTotalTasksCompleted(state),
    taskStreak: getTaskStreak(state),
    tasksCompleted: state.tasks.completedTasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    completeTask: completion => dispatch(completeTask(completion))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordingTaskScreen);
