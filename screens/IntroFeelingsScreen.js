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
import { ErrorText } from "../components/ErrorText";
import { MyText } from "../components/MyText";
import { PageContainer } from "../components/PageContainer";
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
      <ErrorText style={{ marginBottom: 26 }}>{errors.feel}</ErrorText>
    ) : (
      <View style={{ marginBottom: 26 }} />
    );

  state = { promptInputHeight: 20, feelInputHeight: 20 };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <PageContainer style={{ backgroundColor: COLOR_PRIMARY }}>
        {/* <KeyboardAvoidingView
        behavior="height"
        enabled
        keyboardVerticalOffset={0}
      > */}
        <View
          style={{
            padding: 20,
            height: 240,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <MyText
            style={{
              marginTop: 10,
              marginBottom: 24,
              color: COLOR_WHITE,
              fontSize: 21
            }}
          >
            Awesome! An important part of mindfulness is being aware of your
            thoughts, feelings, and body. Now that you've completed the 6
            breaths, take a moment to check in with yourself. Close your eyes
            and scan from head to toe. How do you feel physically, emotionally,
            and mentally?
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
              How do you feel?
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
            height: 180,
            alignContent: "center",
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
      </PageContainer>
    </TouchableWithoutFeedback>
  );
};

saveForm = function(values, props) {
  console.warn(props);
  // let completed = { ...props.navigation.state.params.result };
  // completed.formValues.feel = values.feel;

  console.warn(completed);

  // props.completeTask(completed);
  // props.navigation.navigate("IntroConclusion");
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
    // alignContent: "center",
    // justifyContent: "center"
  }
});

function mapStateToProps(state) {
  let breathTask;
  state.tasks.tasks.forEach(task => {
    // 6 breaths ID
    if (task.id === "4") {
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