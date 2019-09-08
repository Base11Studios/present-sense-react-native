import { withFormik } from "formik";
import { default as React } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import Yup from "yup";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";
import { BackButton } from "../components/BackButton";
import { ErrorText } from "../components/ErrorText";
import { KeyboardAwareScrollingPageContainer } from "../components/KeyboardAwareScrollingPageContainer";
import { MyText } from "../components/MyText";
import { ProgressStepper } from "../components/ProgressStepper";
import { completeTask } from "../redux/reducers/tasks";
import { COLOR_BLACK, COLOR_LIGHT_GREY, COLOR_PRIMARY, COLOR_WHITE } from "../styles/common";

// Our inner form component. Will be wrapped with Formik({..})
const InnerCompleteTaskForm = props => {
  const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
  const { task } = props;

  const promptErrors = !!touched.prompt && !!errors.prompt ? <ErrorText style={{ marginBottom: 20 }}>{errors.prompt}</ErrorText> : <View />;

  state = { promptInputHeight: 20, feelInputHeight: 20 };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollingPageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        <ProgressStepper totalSteps={6} stepNumber={4} style={{ marginBottom: 0 }} />
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            marginBottom: 10
          }}
        >
          <BackButton {...props} color={COLOR_WHITE} underlayColor={COLOR_PRIMARY} />
        </View>
        <View
          style={{
            padding: 20,
            // flex: 2,
            alignItems: "flex-start",
            justifyContent: "flex-start"
          }}
        >
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 12,
              color: COLOR_WHITE,
              fontSize: 20
            }}
          >
            Great job! Write down what you observed during your 6 breaths. This helps you create a habit and visualize your experience.
          </MyText>
        </View>
        <View style={[styles.header]}>
          <View style={{ marginBottom: 16 }}>
            <MyText
              style={{
                fontSize: 21,
                marginBottom: 12,
                color: COLOR_WHITE
              }}
            >
              {task.prompt}
            </MyText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <AutoExpandingTextInput
                onChangeText={text => props.setFieldValue("prompt", text)}
                value={props.values.prompt}
                style={{
                  borderColor: COLOR_WHITE,
                  color: COLOR_BLACK,
                  marginBottom: 10,
                  flex: 10
                }}
                placeholderTextColor={COLOR_LIGHT_GREY}
                underlineColorAndroid={COLOR_WHITE}
                selectionColor={COLOR_WHITE}
              />
              <Button
                style={{
                  flex: 1
                }}
                title="NEXT"
                buttonStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  backgroundColor: COLOR_PRIMARY
                }}
                titleStyle={{
                  fontSize: 14,
                  color: COLOR_WHITE
                }}
                containerStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }}
                onPress={props.handleSubmit}
              />
            </View>
            {promptErrors}
          </View>
        </View>
        <View
          style={{
            padding: 20,
            // flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        {/* </KeyboardAvoidingView> */}
      </KeyboardAwareScrollingPageContainer>
    </TouchableWithoutFeedback>
  );
};

const CompleteTaskForm = withFormik({
  mapPropsToValues: () => ({ prompt: "" }),
  validationSchema: Yup.object().shape({
    prompt: Yup.string().required("Response is required!")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const result = {
      task: props.task,
      formValues: { prompt: values.prompt, feel: "" }
    };
    props.navigation.navigate("IntroFeelings", { result: result });
  },
  displayName: "PromptForm" // helps with React DevTools
})(InnerCompleteTaskForm);

class IntroObservationsScreen extends React.Component {
  render() {
    return <CompleteTaskForm {...this.props} />;
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20
    // flex: 1
    // alignItems: "center",
    // justifyContent: "center"
  }
});

function mapStateToProps(state) {
  let breathTask;
  state.tasks.tasks.forEach(task => {
    // 6 breaths ID
    if (task.id === "44") {
      breathTask = task;
    }
  });

  return {
    task: breathTask
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
)(IntroObservationsScreen);
