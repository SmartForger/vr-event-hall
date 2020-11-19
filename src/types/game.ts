export enum GameFlowSteps {
  Intro = 'intro',
  Welcome = 'welcome',
  Explore = 'explore',
  BackToExplore = 'backtoexplore',
  Demo = 'demo',
  Robot = 'robot',
  Sessions = 'sessions',
  BackToSessions = 'backtosessions',
  Session = 'session',
  Connect = 'connect',
  LiveStream = 'livestream',
  Transition = 'transition',
  EventReplay = 'eventreplay'
}

export interface IGameFlowState {
  step: GameFlowSteps
}
