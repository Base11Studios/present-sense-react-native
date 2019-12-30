import React from "react";
import { StyleSheet } from "react-native";

import { Authenticator } from 'aws-amplify-react-native';

export default class AuthScreen extends React.Component {
  render() {
    return (
      <Authenticator
        // Optionally hard-code an initial state
        // authState="signIn"
        // Pass in an already authenticated CognitoUser or FederatedUser object
        // authData={CognitoUser | 'username'}
        // Fired when Authentication State changes
        onStateChange={authState => {
          if (authState === "signedIn") {
            this.props.navigation.navigate("Profile");
          }
        }}
        // An object referencing federation and/or social providers
        // The federation here means federation with the Cognito Identity Pool Service
        // *** Only supported on React/Web (Not React Native) ***
        // For React Native use the API Auth.federatedSignIn()
        // federated={myFederatedConfig}
        // A theme object to override the UI / styling
        // theme={myCustomTheme}
        // Hide specific components within the Authenticator
        // *** Only supported on React/Web (Not React Native)  ***
        // hide={[
        //   Greetings,
        //   SignIn,
        //   ConfirmSignIn,
        //   RequireNewPassword,
        //   SignUp,
        //   ConfirmSignUp,
        //   VerifyContact,
        //   ForgotPassword,
        //   TOTPSetup,
        //   Loading
        // ]}
        // or hide all the default components
        // hideDefault={true}
        // Pass in an aws-exports configuration
        // amplifyConfig={myAWSExports}
        // Pass in a message map for error strings
        // errorMessage={myMessageMap}
      >
        {/* // Default components can be customized/passed in as child components. // Define them here if you used hideDefault={true}
        <Greetings />
        <SignIn federated={myFederatedConfig} />
        <ConfirmSignIn />
        <RequireNewPassword />
        <SignUp />
        <ConfirmSignUp />
        <VerifyContact />
        <ForgotPassword />
        <TOTPSetup />
        <Loading /> */}
      </Authenticator>
    );
  }
}

const styles = StyleSheet.create({});
