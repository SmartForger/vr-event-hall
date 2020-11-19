import { GameFlowSteps } from '../types'

export const GameFlowStepsConfig = {
  [GameFlowSteps.Intro]: {
    title: GameFlowSteps.Intro.toUpperCase(),
    animation: {
      state: 0,
      time: 2000
    }
  },
  [GameFlowSteps.Welcome]: {
    title: GameFlowSteps.Welcome.toUpperCase(),
    animation: {
      state: 7,
      time: 2000
    }
  },
  [GameFlowSteps.Explore]: {
    title: GameFlowSteps.Explore.toUpperCase(),
    animation: {
      state: 1,
      time: 2700
    }
  },
  [GameFlowSteps.BackToExplore]: {
    title: GameFlowSteps.BackToExplore.toUpperCase(),
    animation: {
      state: 1,
      time: 1000
    }
  },
  [GameFlowSteps.Demo]: {
    title: GameFlowSteps.Demo.toUpperCase(),
    animation: {
      state: 5,
      time: 1500
    }
  },
  [GameFlowSteps.Robot]: {
    title: GameFlowSteps.Robot.toUpperCase(),
    animation: {
      state: 6,
      time: 1000
    }
  },
  [GameFlowSteps.Sessions]: {
    title: GameFlowSteps.Sessions.toUpperCase(),
    animation: {
      state: 2,
      time: 2700
    }
  },
  [GameFlowSteps.Session]: {
    title: GameFlowSteps.Session.toUpperCase(),
    animation: {
      state: 5,
      time: 1500
    }
  },
  [GameFlowSteps.BackToSessions]: {
    title: GameFlowSteps.BackToSessions.toUpperCase(),
    animation: {
      state: 2,
      time: 1000
    }
  },
  [GameFlowSteps.Connect]: {
    title: GameFlowSteps.Connect.toUpperCase(),
    animation: {
      state: 7,
      time: 2000
    }
  },
  [GameFlowSteps.LiveStream]: {
    title: GameFlowSteps.LiveStream.toUpperCase(),
    animation: {
      state: 4,
      time: 2000
    }
  },
  [GameFlowSteps.EventReplay]: {
    title: GameFlowSteps.EventReplay.toUpperCase(),
    animation: {
      state: 5,
      time: 1500
    }
  }
}
