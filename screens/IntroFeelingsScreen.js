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
import { BackButton } from "../components/BackButton";
import { ErrorText } from "../components/ErrorText";
import { KeyboardAwareScrollingPageContainer } from "../components/KeyboardAwareScrollingPageContainer";
import { MyText } from "../components/MyText";
import { ProgressStepper } from "../components/ProgressStepper";
import { completeTask } from "../redux/reducers/tasks";
import {
  COLOR_BLACK,
  COLOR_LIGHT_GREY,
  COLOR_PRIMARY,
  COLOR_WHITE
} from "../styles/common";

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

  const feelErrors =
    !!touched.feel && !!errors.feel ? (
      <ErrorText style={{ marginBottom: 20 }}>{errors.feel}</ErrorText>
    ) : (
      <View style={{ marginBottom: 20 }} />
    );

  state = { promptInputHeight: 20, feelInputHeight: 20 };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollingPageContainer
        style={{ backgroundColor: COLOR_PRIMARY }}
      >
        <ProgressStepper
          totalSteps={6}
          stepNumber={5}
          style={{ marginBottom: 0 }}
        />
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            marginBottom: 10
          }}
        >
          <BackButton
            {...props}
            color={COLOR_WHITE}
            underlayColor={COLOR_PRIMARY}
          />
        </View>
        <View
          style={{
            padding: 20,
            flex: 2,
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
            Awesome! It's important to be aware of your thoughts, feelings, and
            body. Close your eyes and briefly scan from head to toe.
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
              {task.feelPrompt}
            </MyText>
            <AutoExpandingTextInput
              onChangeText={text => props.setFieldValue("feel", text)}
              value={props.values.feel}
              style={{
                borderColor: COLOR_WHITE,
                color: COLOR_BLACK,
                marginBottom: 10
              }}
              placeholderTextColor={COLOR_LIGHT_GREY}
              underlineColorAndroid={COLOR_WHITE}
              selectionColor={COLOR_WHITE}
            />
            {feelErrors}
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
            title="Feelings, Journaled"
            color={COLOR_WHITE}
            buttonStyle={{
              backgroundColor: COLOR_PRIMARY
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
  mapPropsToValues: () => ({ feel: "" }),
  validationSchema: Yup.object().shape({
    feel: Yup.string().required("Response is required!")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let completed = { ...props.navigation.state.params.result };
    completed.formValues.feel = values.feel;
    completed.hideToast = true;

    props.completeTask(completed);
    props.navigation.navigate("IntroConclusion");
  },
  displayName: "FeelForm" // helps with React DevTools
})(InnerCompleteTaskForm);

class IntroFeelingsScreen extends React.Component {
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
  let breathTask;
  state.tasks.tasks.forEach(task => {
    // Tutorial 6 breaths ID
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
)(IntroFeelingsScreen);
