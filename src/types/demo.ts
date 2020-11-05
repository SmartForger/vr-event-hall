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
  side?: {
    header: string
    body: string
    title?: string
  }
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
  mecExplainer = '1',
  fiveGCoverage = '2',
  shotTracker = '3',
  tata = '4',
  avesha = '5',
  ybvr = '6',
  indy = '7',
  fiveStatesOfReady = '8',
  crowdVision = '9',
  sot = '10'
}
