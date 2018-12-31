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
import { setDailyIntention } from '../redux/reducers/tasks';
import {
  COLOR_BLACK,
  COLOR_LIGHT_GREY,
  COLOR_PRIMARY,
  COLOR_WHITE
} from '../styles/common';

// Our inner form component. Will be wrapped with Formik({..})
const InnerCreateIntentionForm = props => {
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

  const intentionErrors =
    !!touched.intention && !!errors.intention ? (
      <ErrorText style={{ marginBottom: 26 }}>{errors.intention}</ErrorText>
    ) : (
      <View style={{ marginBottom: 26 }} />
    );

  state = { promptInputHeight: 20, intentionInputHeight: 20 };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollingPageContainer
        style={{ backgroundColor: COLOR_PRIMARY }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 20
          }}
        >
          <BackButton
            {...props}
            color={COLOR_WHITE}
            underlayColor={COLOR_PRIMARY}
          />
          <DismissButton
            color={COLOR_WHITE}
            {...props}
            resetRoute="DoTask" // TODO
            underlayColor={COLOR_PRIMARY}
          />
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
            Create your intention. Be purposeful and be positive. Try starting
            with "I will", "Be", "Do", or choose your own start.
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
              What's your intention today?
            </MyText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <AutoExpandingTextInput
                onChangeText={text => props.setFieldValue('intention', text)}
                value={props.values.intention}
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
                  backgroundColor: COLOR_PRIMARY
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
            {intentionErrors}
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

const CreateIntentionForm = withFormik({
  mapPropsToValues: () => ({ intention: '' }),
  validationSchema: Yup.object().shape({
    intention: Yup.string().required('Response is required!')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.setDailyIntention(values.intention);
    props.navigation.navigate('Home');
  },
  displayName: 'DailyIntentionForm' // helps with React DevTools
})(InnerCreateIntentionForm);

class CreateOwnIntentionScreen extends React.Component {
  render() {
    return <CreateIntentionForm {...this.props} />;
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setDailyIntention: intention => dispatch(setDailyIntention(intention))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateOwnIntentionScreen);
