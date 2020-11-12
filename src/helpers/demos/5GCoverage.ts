import { IDemo, E3DDemoNameVals } from '../../types'

export const fiveGCoverage: IDemo = {
  type: '5GCoverage',
  video: '5GCoverage720.mp4',
  conversationId: 'f10f7caa-26e3-4b49-997e-fc046c7cb665',
  end: {
    header: 'Verizon 5G Coverage',
    body:
      'How do you build 5G right? Start with America’s most reliable network, Verizon. Then build in the coverage of 5G Nationwide and add the unprecedented performance of 5G Ultra Wideband, the fastest 5G in the world.',
    expert: '',
    nextDemoText: 'MEC explained.',
    nextDemo: E3DDemoNameVals.mecExplainer,
    nextDemoThumbnail: 'mec-thumbnail.png'
  },
  timestamps: {
    0: [
      {
        header: '5G Nationwide covers more than 200m Americans in over 1800 cities.'
      }
    ],
    12000: [
      {
        header: '5G Ultra Wideband, the fastest 5G in the world, in 60 cities by the end of the year.'
      }
    ],
    22000: [
      {
        header: '5G Edge is already in 5 cities and will be in more by the end of the year.'
      }
    ]
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
