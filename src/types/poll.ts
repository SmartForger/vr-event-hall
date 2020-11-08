export interface IAskedPollQuestion {
  id: string
  name: string
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
  collecting = 'collecting',
  results = 'results'
}

interface IPollAnswer {
  pollId
  answer
}

export interface IPollAnswerResults {
  total: number
  optionA: number
  optionB: number
  optionC: number
  optionD: number
}
