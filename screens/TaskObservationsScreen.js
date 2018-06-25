import { withFormik } from "formik";
import { default as React } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import Yup from "yup";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";
import { DismissButton } from "../components/DismissButton";
import { ErrorText } from "../components/ErrorText";
import { KeyboardAwareScrollingPageContainer } from "../components/KeyboardAwareScrollingPageContainer";
import { MyText } from "../components/MyText";
import { ProgressStepper } from "../components/ProgressStepper";
import { getBackgroundColorByDay } from "../constants/Helpers";
import { completeTask } from "../redux/reducers/tasks";
import { COLOR_BLACK, COLOR_LIGHT_GREY, COLOR_WHITE } from "../styles/common";

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
  const { task } = props;

  const promptErrors =
    !!touched.prompt && !!errors.prompt ? (
      <ErrorText style={{ marginBottom: 20 }}>{errors.prompt}</ErrorText>
    ) : (
      <View />
    );

  state = { promptInputHeight: 20, feelInputHeight: 20 };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollingPageContainer
        style={{ backgroundColor: getBackgroundColorByDay(task.type) }}
      >
        <ProgressStepper
          totalSteps={2}
          stepNumber={1}
          style={{ marginBottom: 0 }}
        />
        <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
          <DismissButton
            color={COLOR_WHITE}
            {...props}
            resetRoute="DoTask"
            underlayColor={getBackgroundColorByDay(task.type)}
          />
        </View>
        <View
          style={{
            padding: 0,
            flex: 2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 20
            }}
          >
            Way to go! Now let's journal about your observations during{" "}
            {task.title}.
          </MyText>
        </View>
        <View style={[styles.header, { flex: 1 }]}>
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
            <AutoExpandingTextInput
              onChangeText={text => props.setFieldValue("prompt", text)}
              value={props.values.prompt}
              style={{
                borderColor: COLOR_WHITE,
                color: COLOR_BLACK,
                marginBottom: 10
              }}
              placeholderTextColor={COLOR_LIGHT_GREY}
              underlineColorAndroid={COLOR_WHITE}
              selectionColor={COLOR_WHITE}
            />
            {promptErrors}
          </View>
        </View>
        <View
          style={{
            padding: 20,
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            iconRight={{ name: "keyboard-arrow-right", type: "material" }}
            title="Observations, Journaled"
            color={COLOR_WHITE}
            buttonStyle={{
              backgroundColor: getBackgroundColorByDay(task.type)
            }}
            large={true}
            onPress={props.handleSubmit}
          />
        </View>
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

    props.navigation.navigate("TaskFeelings", { result: result });
  },
  displayName: "TaskPromptForm" // helps with React DevTools
})(InnerCompleteTaskForm);

class TaskObservationsScreen extends React.Component {
  render() {
    return <CompleteTaskForm {...this.props} />;
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flex: 1
    // alignItems: "center",
    // justifyContent: "center"
  }
});

function mapStateToProps(state) {
  return {
    task: state.tasks.activeTask
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
)(TaskObservationsScreen);
