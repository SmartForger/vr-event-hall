export enum AuthFlowSteps {
  Welcome = 'welcome',
  ConfirmSignUp = 'confirmSignUp',
  ForgotPassword = 'forgotPasword',
  Register = 'register',
  ResendCode = 'resendCode',
  SignIn = 'signIn',
  SignUp = 'signUp',
  ThankYou = 'thankYou',
  BreakoutSessions = 'breakoutSelection',
  HaveAQuestion = 'haveAQuestion',
  Survey = 'survey',
  Root = 'root'
}

export interface IAuthFlowState {
  step: AuthFlowSteps
}
