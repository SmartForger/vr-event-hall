export type TNoticeType = 'external' | 'demo' | 'session'

export interface INoticeConfig {
  type?: TNoticeType
  body?: string
  button?: string
  link?: string
}
