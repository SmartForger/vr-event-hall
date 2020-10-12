export interface IDictionary {
  [key: string]: {
    [key: string]: string
  }
}

export interface ICommonDict {
  alreadyHaveAnAccount: string
  back: string
  completeRegistration: string
  confirmationCode: string
  confirmEmail: string
  confirmEmailInstructions: string
  confirmPassword: string
  continue: string
  dontHaveAnAccount: string
  email: string
  eventInfo: string
  firstName: string
  forgotPassword: string
  help: string
  lastName: string
  next: string
  password: string
  passwordRequirements: string
  register: string
  resendCode: string
  select: string
  signIn: string
  signUp: string
  submit: string
}

export interface IErrorDict {
  emailAlreadyRegistered: string
  emailNotFound: string
  incorrectEmailOrPassword: string
  invalidEmail: string
  invalidConfirmationCode: string
  invalidPassword: string
  invalidPhone: string
  invalidZip: string
  limitExceeded: string
  passwordsMustMatch: string
  requiredField: string
}

export interface IPasswordReqDict {
  passwordMustContain: string
  passwordReqLength: string
  passwordReqUpperCase: string
  passwordReqLowerCase: string
  passwordReqNumber: string
  passwordReqSymbol: string
}

export interface IBreakoutDict {
  registerForABreakout: string
  reserveYourBreakoutBlurb: string
  breakoutSession: string
  'breakoutSessionName-healthcareInsurance': string
  'breakoutSessionPresenter-healthcareInsurance': string
  'breakoutSessionDescription-healthcareInsurance': string
  'breakoutSessionName-retailTravelDistribution': string
  'breakoutSessionPresenter-retailTravelDistribution': string
  'breakoutSessionDescription-retailTravelDistribution': string
  'breakoutSessionName-financialServices': string
  'breakoutSessionPresenter-financialServices': string
  'breakoutSessionDescription-financialServices': string
  'breakoutSessionName-manufacturingEnergyUtilities': string
  'breakoutSessionPresenter-manufacturingEnergyUtilities': string
  'breakoutSessionDescription-manufacturingEnergyUtilities': string
  'breakoutSessionName-mediaEntertainmentTech': string
  'breakoutSessionPresenter-mediaEntertainmentTech': string
  'breakoutSessionDescription-mediaEntertainmentTech': string
  finish: string
  skip: string
}

export interface ISurveyDict {
  surveyTitle: string
  surveyInstructions: string
  'question-keynoteSpeaker': string
  'question-learningObjectives': string
}
export interface IRegistrationDict {
  avatarInstructions: string
  city: string
  completeRegistration: string
  country: string
  dropImage: string
  employeeRange1: string
  employeeRange2: string
  employeeRange3: string
  joinUs: string
  mailingAddress: string
  mailingAddressReason: string
  phoneNumber: string
  selectedImage: string
  state: string
  titlePosition: string
  aboutYourCompany: string
  companySize: string
  companyAddress: string
  companyName: string
  youreIn: string
  zip: string
}

export interface IThankYouDict {
  lookForwardToSeeingYou: string
  registrationCompleteBlurb: string
  stayTuned: string
  eventInfo: string
  verizonHub: string
}
