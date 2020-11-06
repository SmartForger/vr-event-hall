import {
  ICommonDict,
  IErrorDict,
  IPasswordReqDict,
  IBreakoutDict,
  IThankYouDict,
  IRegistrationDict,
  ISurveyDict,
  IScenesDict
} from 'types'

const common: ICommonDict = {
  alreadyHaveAnAccount: 'Already have an account?',
  back: 'Back',
  completeRegistration: 'Complete Registration',
  confirmationCode: 'Confirmation Code',
  confirmEmail: 'Confirm E-mail',
  confirmEmailInstructions:
    'A confirmation code was sent to your e-mail. Didn’t receive it? Check your spam folder or resend code.',
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

const survey: ISurveyDict = {
  surveyTitle: 'Quick Survey.',
  surveyInstructions: "We'd love to hear from you.",
  'question-keynoteSpeaker':
    'Do you have any questions for our key note speaker? Help us kick off the event with Bozoma Saint John.',
  'question-learningObjectives': 'What do you want to learn about 5G? What do you want to get out of this event?'
}

const registration: IRegistrationDict = {
  avatarInstructions: 'Upload picture for event profile',
  city: 'City',
  completeRegistration: `To get started, let's set up your personal profile.`,
  country: 'Country',
  dropImage: 'Drop the image here...',
  employeeRange1: '0 - 9 Employees',
  employeeRange2: '10 - 499 Employees',
  employeeRange3: '500+ Employees',
  cSuite: 'C-Suite',
  vp: 'VP',
  director: 'Director',
  manager: 'Manager',
  staff: 'Staff',
  joinUs: 'Join us for 5G<br /> Innovation Sessions.',
  mailingAddress: 'Mailing address',
  mailingAddressReason:
    'If you would like to receive a complimentary program package, please provide your mailing address below.',
  companyAddress: 'Organization address',
  companyName: 'Organization Name',
  phoneNumber: 'Phone Number',
  selectedImage: 'Selected image: ',
  state: 'State',
  aboutYourCompany: 'About your organization',
  companySize: 'Organization Size',
  titlePosition: 'Title / Position',
  youreIn: "Congrats, You're In!",
  zip: 'Postal Code',
  emailWillBecomeUsername: 'Your email will automatically become your username.'
}

const breakout: IBreakoutDict = {
  registerForABreakout: 'Register for a breakout session.',
  reserveYourBreakoutBlurb:
    "Following the presentations, you'll have an opportunity to hear how your business can take advantage of the full, transformative power of 5G.  Let our experts take you on a deeper dive into vertical-specific use cases to demonstrate how your business can benefit from Verizon's 5G.<br/>Each session includes a live Q&A. Capacity is limited to 200 attendees each. Please make your selection to save your spot!",
  breakoutSession: 'Breakout session',
  'breakoutSessionName-healthcareInsurance': 'Healthcare, Insurance & Life Sciences',
  'breakoutSessionPresenter-healthcareInsurance': '',
  'breakoutSessionDescription-healthcareInsurance': '',
  'breakoutSessionName-retailTravelDistribution': 'Retail/Hospitality, Travel & Distribution',
  'breakoutSessionPresenter-retailTravelDistribution': '',
  'breakoutSessionDescription-retailTravelDistribution': '',
  'breakoutSessionName-financialServices': 'Financial Services',
  'breakoutSessionPresenter-financialServices': '',
  'breakoutSessionDescription-financialServices': '',
  'breakoutSessionName-manufacturingEnergyUtilities': 'Manufacturing, Automotive, Construction, Energy & Utilities',
  'breakoutSessionPresenter-manufacturingEnergyUtilities': '',
  'breakoutSessionDescription-manufacturingEnergyUtilities': '',
  'breakoutSessionName-mediaEntertainmentTech': 'Media, Entertainment, Technology & Services',
  'breakoutSessionPresenter-mediaEntertainmentTech': '',
  'breakoutSessionDescription-mediaEntertainmentTech': '',
  finish: 'Finish',
  skip: 'Skip'
}

const passwordRequirements: IPasswordReqDict = {
  passwordMustContain: 'Password must contain:',
  passwordReqLength: 'Must contain at least 12 characters',
  passwordReqUpperCase: 'Must contain at least one upper-case letter',
  passwordReqLowerCase: 'Must contain at least one lower-case letter',
  passwordReqNumber: 'Must contain at least one number',
  passwordReqSymbol: 'Must contain at least one special character'
}

const thankYou: IThankYouDict = {
  lookForwardToSeeingYou: 'We look forward to seeing you!',
  registrationCompleteBlurb:
    'Your registration is complete! We look forward to seeing you at the 5G Innovation Sessions on November 18, 2020.',
  stayTuned: ' Please check your email for the registration confirmation and for updates as the event approaches.',
  eventInfo: 'Event Info',
  verizonHub: 'Verizon Hub'
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
  invalidCity: 'Invalid City',
  limitExceeded: 'Attempt limit exceeded. Please try again later.',
  passwordsMustMatch: 'Passwords must match.',
  requiredField: 'Required Field'
}

const scenes: IScenesDict = {
  exploreSceneTitle: '5G will change everything.',
  exploreSceneBlurb: "We're partnering with businesses and innovators to make groundbreaking 5G ideas a reality.",
  sessionsSceneTitle: 'Talk with our experts.',
  sessionsSceneBlurb:
    'Hear from thought-provoking leaders who explain how Verizon 5G is already transforming industries.',
  clickAndDragToExplore: 'Click and drag to explore',
  theEventWillBeginIn: 'The next session will begin in',
  theEventWillStartOn: 'The next session will start on',
  explore: 'Explore',
  sessions: 'Sessions',
  connect: 'Connect',
  liveStream: 'Live Stream',
  startingSoon: 'The Digital Transformation of Venues speaker session begins now.',
  goToLiveStream: 'Go to Live Stream'
}

export const en = {
  ...common,
  ...passwordRequirements,
  ...errors,
  ...registration,
  ...breakout,
  ...survey,
  ...thankYou,
  ...scenes
}
