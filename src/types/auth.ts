export enum AuthFlowSteps {
  Welcome = 'welcome',
  ConfirmSignUp = 'confirmSignUp',
  ForgotPassword = 'forgotPasword',
  Register = 'register',
  ResendCode = 'resendCode',
  SignIn = 'signIn',
  SignUp = 'signUp',
  ThankYou = 'thankYou'
}

export interface IAuthFlowState {
  step: AuthFlowSteps
}
