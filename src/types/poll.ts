export interface IAskedPollQuestion {
  id: string
  question: string
  active: boolean
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  // answer: string
}

export enum EPollDisplayMode {
  question = 'question',
  wait = 'wait',
  results = 'results'
}
