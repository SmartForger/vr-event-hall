export enum EventStages {
  REGISTRATION = 'REGISTRATION',
  PRESHOW = 'PRESHOW',
  COUNTDOWN = 'COUNTDOWN',
  LIVESTREAM = 'LIVESTREAM',
  POSTSHOW = 'POSTSHOW'
}

export enum Environments {
  DEV = 'dev',
  LOCAL = 'local',
  PROD = 'prod',
  STAGING = 'staging',
  QA = 'dev'
}

export const defaultEventConfigs: { [key: string]: EventConfig } = {
  prod: {
    id: '1',
    name: Environments.PROD,
    useBackupStream: false,
    vcOff: false
  },
  dev: {
    id: '2',
    name: Environments.DEV,
    useBackupStream: false,
    vcOff: false
  },
  staging: {
    id: '3',
    name: Environments.STAGING,
    useBackupStream: false,
    vcOff: false
  },
  local: {
    id: 'fcff0141-4a49-4322-9b64-4618e4081249',
    name: Environments.LOCAL,
    useBackupStream: false,
    vcOff: false
  }
}

export interface EventConfig {
  id: string
  name: string
  stage?: EventStages
  useBackupStream?: boolean
  streamStartTime?: string
  vcOff: boolean
}
