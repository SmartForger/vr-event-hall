export enum GameFlowSteps {
  Intro = 'intro',
  Welcome = 'welcome',
  Explore = 'explore',
  BackToExplore = 'bacaktoexplore',
  Demo = 'demo',
  Robot = 'robot',
  Sessions = 'sessions',
  BackToSessions = 'backtosessions',
  Session = 'session',
  Connect = 'connect',
  LiveStream = 'livestream',
  Transition = 'transition'
}

export interface IGameFlowState {
  step: GameFlowSteps
}