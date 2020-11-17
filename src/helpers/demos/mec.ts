import { IDemo, E3DDemoNameVals } from '../../types'

export const mecExplainer: IDemo = {
  type: 'mecExplainer',
  intro: 'MECExplainerWillPower-intro_720.mp4',
  conversationId: 'e23af63b-2c83-44e2-87cb-43207209feed',
  video: 'MECExplained_v1.mp4',
  end: {
    header: 'Harness the cloud.',
    body:
      '5G Edge puts the power of the cloud right into the Verizon network - bringing computing power closer to where it’s needed. It’s the world’s first mobile edge compute platform with AWS Wavelength.',
    expert: '',
    nextDemoText: 'Speed of Thought',
    nextDemo: E3DDemoNameVals.sot,
    nextDemoThumbnail: 'sot-thumbnail.png'
  },
  poll: {
    id: 'mec',
    header: 'How familiar are you with 5G MEC and its use cases?',
    qrImg: 'mecQR.png',
    qrText: 'Download our white paper to learn more about MEC.',
    options: [
      { label: 'Very familiar', results: 0 },
      { label: 'Familiar', results: 0 },
      { label: 'Somewhat familiar', results: 0 },
      { label: 'Not familiar', results: 0 }
    ]
  }
}
