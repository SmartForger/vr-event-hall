import { IDemo, E3DDemoNameVals } from '../../types'

export const ybvr: IDemo = {
  type: 'ybvr',
  intro: 'YBVR-intro_720.mp4',
  video: 'YBVR720.mp4',
  conversationId: 'd1a80a79-6524-4ece-9860-85d48338b520',
  end: {
    header: 'The cloud, transformed.',
    body:
      'For years, the ambitions of innovative organizations have outpaced the cloud’s ability to meet them. Not anymore. Introducing Verizon 5G Edge, the first mobile edge compute platform with AWS Wavelength in the world.',
    qr: '5GQR.png',
    expert: '',
    nextDemoText: '5G Edge and data-driven decision making',
    nextDemo: E3DDemoNameVals.shotTracker,
    nextDemoThumbnail: 'shottracker-thumbnail.png'
  },
  timestamps: {
    0: [
      {
        header: 'YBVR 5G and MEC'
      }
    ],
    5000: [
      {
        logo: 'wifi.svg',
        header: 'The Australian Open and the Laver Cup were filmed and streamed in 8K Ultra HD at 60 frames per second.'
      }
    ],
    12000: [
      {
        logo: 'video.svg',
        header: 'Exclusive first row views',
        body:
          'Two 360° and two 180° cameras were placed alongside the court to provide exclusive first row views of the Laver Cup.'
      }
    ],
    20000: [
      {
        logo: 'mini-signal.svg',
        header: 'Remote production',
        body: 'The footage was wirelessly streamed through 5G to the production control center.'
      }
    ],
    26000: [
      {
        logo: 'speedometer.svg',
        header: 'Peak rates of up to 10 Gbps someday possible',
        body:
          'Verizon’s 5G Ultra Wideband network has reached peak download speeds of 4Gbps and peak upload speeds of 200 Mbps in some places under ideal circumstances.'
      }
    ],
    32000: [
      {
        logo: 'ping.svg',
        header: 'Edge compute',
        body:
          'Putting the parts of the applications closer to the endpoints, so data doesn’t have to shuttle back and forth between far-away servers and user devices.'
      }
    ],
    45000: [
      {
        logo: 'timer.svg',
        header: 'Latency can fall to under 10ms with 5G Edge'
      }
    ],
    50000: [
      {
        logo: 'reoccurring-payment.svg',
        header: '$420 billion',
        body: 'Driven by 5G and MEC, annual mobile media revenues are expected to double in the next 10 years.'
      }
    ],
    64000: [
      {
        logo: 'oculus.svg',
        header: 'The Oculus Quest weighs 570 grams',
        body: 'An average pair of sunglasses weighs 25 to 50 grams.'
      }
    ],
    72000: [
      {
        logo: 'map-pin.svg',
        header: 'Potential use cases for MEC and 5G in the business world',
        list: [
          'Hyper-realistic training environments',
          'Advanced medical imaging',
          'Remote repair',
          'Immersive meetings',
          'Augmented Retail',
          'Smart Factories'
        ]
      }
    ]
  }
}
