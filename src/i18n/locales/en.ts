import { ICommonDict, IErrorDict, IPasswordReqDict, IRegistrationDict } from 'types'

const common: ICommonDict = {
  alreadyHaveAnAccount: 'Already have an account?',
  back: 'Back',
  completeRegistration: 'Complete Registration',
  confirmationCode: 'Confirmation Code',
  confirmEmail: 'Confirm E-mail',
  confirmEmailInstructions: 'A Confirmation Code was sent to your E-mail.',
  confirmPassword: 'Confirm Password',
  continue: 'Continue',
  dontHaveAnAccount: "Don't have an account?",
  email: 'E-mail',
  eventInfo: 'Event Info',
  firstName: 'First Name',
  forgotPassword: 'Forgot Password?',
  help: 'Help',
  lastName: 'Last Name',
  next: 'Next',
  password: 'Password',
  passwordRequirements: 'Password Requirements',
  register: 'Register',
  resendCode: 'Resend Code',
  select: 'Select',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  submit: 'Submit'
}

const registration: IRegistrationDict = {
  avatarInstructions: 'Click to Browse or drag and drop an image here',
  city: 'City',
  completeRegistration: `To get started, let's set up your personal profile.`,
  country: 'Country',
  dropImage: 'Drop the image here...',
  employeeRange1: '0 - 50 Employees',
  employeeRange2: '50 - 499 Employees',
  employeeRange3: '500+ Employees',
  joinUs: 'Join us for 5G<br /> Innovation Sessions',
  mailingAddress: 'Mailing address',
  mailingAddressReason: 'To receive a special program package, subject to availability while supplies last.',
  phoneNumber: 'Phone Number',
  selectedImage: 'Selected image: ',
  state: 'State',
  titlePosition: 'Title / Position',
  youreIn: "Congrats, You're In!",
  zip: 'Postal Code'
}

const passwordRequirements: IPasswordReqDict = {
  passwordMustContain: 'Password must contain:',
  passwordReqLength: 'Must contain at least 12 characters',
  passwordReqUpperCase: 'Must contain at least one upper-case letter',
  passwordReqLowerCase: 'Must contain at least one lower-case letter',
  passwordReqNumber: 'Must contain at least one number',
  passwordReqSymbol: 'Must contain at least one special character'
}

const errors: IErrorDict = {
  emailAlreadyRegistered: 'This E-mail has already been registered.',
  emailNotFound: 'E-mail not found',
  incorrectEmailOrPassword: 'Incorrect E-mail or password.',
  invalidConfirmationCode: 'Invalid confirmation code.',
  invalidEmail: 'Invalid E-mail Address',
  invalidPassword: 'Password does not meet requirements',
  invalidPhone: 'Invalid Phone Number',
  invalidZip: 'Invalid Postal Code',
  limitExceeded: 'Attempt limit exceeded. Please try again later.',
  passwordsMustMatch: 'Passwords must match.',
  requiredField: 'Required Field'
}

export const en = { ...common, ...passwordRequirements, ...errors, ...registration }
