import { withFormik } from 'formik';
import { default as React } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Yup from 'yup';
import { AutoExpandingTextInput } from '../components/AutoExpandingTextInput';
import { BackButton } from '../components/BackButton';
import { DismissButton } from '../components/DismissButton';
import { ErrorText } from '../components/ErrorText';
import { KeyboardAwareScrollingPageContainer } from '../components/KeyboardAwareScrollingPageContainer';
import { MyText } from '../components/MyText';
import { ProgressStepper } from '../components/ProgressStepper';
import { getBackgroundColorByDay } from '../constants/Helpers';
import { completeDailyIntention, completeTask } from '../redux/reducers/tasks';
import { COLOR_BLACK, COLOR_LIGHT_GREY, COLOR_WHITE } from '../styles/common';

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
      <KeyboardAwareScrollingPageContainer
        style={{ backgroundColor: getBackgroundColorByDay(task.type) }}
      >
        <ProgressStepper
          totalSteps={2}
          stepNumber={2}
          style={{ marginBottom: 0 }}
        />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 20
          }}
        >
          <View>
            <BackButton
              {...props}
              color={COLOR_WHITE}
              underlayColor={getBackgroundColorByDay(task.type)}
            />
          </View>
          <View>
            <DismissButton
              color={COLOR_WHITE}
              {...props}
              resetRoute="DoTask"
              underlayColor={getBackgroundColorByDay(task.type)}
            />
          </View>
        </View>
        <View
          style={{
            padding: 20,
            // flex: 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
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
            Awesome! Now that you've completed {task.title}, how do you feel?
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
              How do you feel?
            </MyText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <AutoExpandingTextInput
                onChangeText={text => props.setFieldValue('feel', text)}
                value={props.values.feel}
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
                color={COLOR_WHITE}
                buttonStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  backgroundColor: getBackgroundColorByDay(task.type)
                }}
                fontSize={14}
                containerViewStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }}
                large={false}
                onPress={props.handleSubmit}
              />
            </View>
            {feelErrors}
          </View>
        </View>
        <View
          style={{
            padding: 20,
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </KeyboardAwareScrollingPageContainer>
    </TouchableWithoutFeedback>
  );
};

const CompleteTaskForm = withFormik({
  mapPropsToValues: () => ({ feel: '' }),
  validationSchema: Yup.object().shape({
    feel: Yup.string().required('Response is required!')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let completed = { ...props.navigation.state.params.result };
    completed.formValues.feel = values.feel;
    completed.hideToast = false;

    if (completed.task.id === '16') {
      props.completeDailyIntention();
    }

    props.completeTask(completed);
    props.navigation.navigate('Profile');
  },
  displayName: 'TaskFeelForm' // helps with React DevTools
})(InnerCompleteTaskForm);

class TaskFeelingsScreen extends React.Component {
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
  return {
    task: state.tasks.activeTask
  };
}

function mapDispatchToProps(dispatch) {
  return {
    completeTask: completion => dispatch(completeTask(completion)),
    completeDailyIntention: () => dispatch(completeDailyIntention())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskFeelingsScreen);
