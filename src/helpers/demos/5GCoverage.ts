import { IDemo, E3DDemoNameVals } from '../../types'

export const fiveGCoverage: IDemo = {
  type: '5GCoverage',
  video: '5GCoverage720.mp4',
  conversationId: 'f10f7caa-26e3-4b49-997e-fc046c7cb665',
  end: {
    header: '5G Ultra Wideband and 5G Nationwide.',
    body:
      '',
    expert: '',
    nextDemoText: 'MEC explained.',
    nextDemo: E3DDemoNameVals.mecExplainer,
    nextDemoThumbnail: 'mec-thumbnail.png'
  },
  poll: {
    id: '5gcoverage',
    header: "Have you used, or are you currently using Verizon's 5G network?",
    options: [
      { label: 'Yes', results: 0 },
      { label: 'No', results: 0 }
    ]
  }
}
