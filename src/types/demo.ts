import { GridSize } from '@material-ui/core'

export interface IPoll {
  header: string
  id: string
  qrImg?: string
  qrText?: string
  options: Array<{ label: string; results?: number }>
}

interface ISubItems {
  preHeader?: string
  logo?: string
  header?: string
  video?: string
  image?: string
  imgFallback?: string
  body?: string
  inlineBody1?: string
  inlineBody2?: string
  links?: IDemoLinkConfig[]
  gWidth?: GridSize
}

export interface IDemoLinkConfig {
  text?: string
  icon?: string
  goTo?: string
  colSize?: any
  param?: string
}

export interface ITimestamp {
  logo?: string
  header?: string
  body?: string
  items?: Array<ISubItems>
  list?: Array<string>
}

export enum ETouchpoints {
  None = 'none',
  RobotFrontArms = 'robotFrontArms',
  RobotMiddle = 'robotMiddle',
  RobotScannerBox = 'robotScannerBox'
}

export interface ITouchpoints {
  [key: string]: ISubItems[]
}

export interface IDemo {
  type?: string
  conversationId?: string
  intro?: string
  video?: string
  poster?: string
  end?: {
    header: string
    body: string
    nextDemo?: string | IDemo
    nextDemoText?: string
    nextDemoThumbnail?: string
    expert?: string
    qr?: string
    links?: IDemoLinkConfig[]
  }
  touchpoints?: ITouchpoints
  timestamps?: { [key: number]: Array<ITimestamp> }
  poll?: IPoll
}

export interface IDemoCollection {
  [key: string]: IDemo
}

export enum E3DDemoNameVals {
  unknown = '0',
  fiveStatesOfReady = '1',
  fiveGCoverage = '2',
  mecExplainer = '3',
  sot = '4',
  tata = '5',
  ybvr = '6',
  shotTracker = '7',
  avesha = '8',
  iceMobility = '9',
  indy = '10',
  crowdVision = '11',
  zixi = '12'
}

export enum E3DSessionNameVals {
  unknown = '0',
  healthcareInsurance = '1',
  retailTravelDistribution = '2',
  financialServices = '3',
  manufacturingEnergyUtilities = '4',
  mediaEntertainmentTech = '5'
}
