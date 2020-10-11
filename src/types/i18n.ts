import { StringDictionary } from 'babylonjs'

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

export interface IBreakoutSession {
  id: string
  name: string
  presenter: string
  description: string
}
export interface IBreakoutDict {
  registerForABreakout: string
  reserverYourBreakoutBlurb: string
  breakoutSession: string
  breakoutSession1Id: string
  breakoutSession1Name: string
  breakoutSession1Presenter: string
  breakoutSession1Description: string
  breakoutSession2Id: string
  breakoutSession2Name: string
  breakoutSession2Presenter: string
  breakoutSession2Description: string
  finish: string
  skip: string
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
