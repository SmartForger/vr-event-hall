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

export interface IRegistrationDict {
  avatarInstructions: string
  city: string
  company: string
  companyAddress: string
  companyName: string
  companySize: string
  completeRegistration: string
  country: string
  dropImage: string
  employeeRange1: string
  employeeRange2: string
  employeeRange3: string
  joinUs: string
  phoneNumber: string
  selectedImage: string
  state: string
  titlePosition: string
  youreIn: string
  zip: string
}
