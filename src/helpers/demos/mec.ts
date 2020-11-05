import { IDemo, E3DDemoNameVals } from '../../types'

export const mecExplainer: IDemo = {
  type: 'mecExplainer',
  intro: 'mec-explainer-intro.mp4',
  conversationId: 'e23af63b-2c83-44e2-87cb-43207209feed',
  video: 'mec720.mp4',
  end: {
    header: 'Harness the cloud.',
    body:
      '5G Edge puts the power of the cloud right into the Verizon network - bringing computing power closer to where it’s needed. It’s the world’s first mobile edge compute platform with AWS Wavelength.',
    expert: '',
    nextDemoText: 'Verizon 5G Ultra Wideband at the Indy 500',
    nextDemo: E3DDemoNameVals.indy,
    nextDemoThumbnail: 'indy-thumbnail.png'
  },
  timestamps: {
    0: [
      {
        header: 'Multi-access edge computing explained by IndyCar champion Will Power',
        items: [
          { header: '35-time IndyCar race winner', logo: 'flag.svg' },
          { header: 'Tied for seventh on the all-time list', logo: 'trophy.svg' }
        ]
      }
    ],
    4000: [
      {
        logo: 'medal.svg',
        header: 'An award-winning partnership',
        body: 'Verizon sponsored Team Penske has 18 Indy 500 victories, the most of any team in history.'
      }
    ],
    8000: [
      {
        logo: 'lightning.svg',
        header: '240mph',
        body: 'Current IndyCar top speed'
      }
    ],
    16000: [
      {
        logo: 'ping.svg',
        header: 'Network latency',
        body: 'The time required for a packet of data to travel round trip between two points.'
      }
    ],
    29000: [
      {
        logo: 'eye.svg',
        header: 'The average reaction time for humans to visual stimulus is 250ms.'
      }
    ],
    32000: [
      {
        logo: 'timer.svg',
        header: '50ms',
        body: 'Average 4G latency'
      }
    ],
    38000: [
      {
        logo: 'speedometer.svg',
        header: 'Closer proximity. <br/> Lower latency.'
      }
    ],
    43000: [
      {
        logo: 'timer.svg',
        header: '50ms',
        body: 'Average 4G latency'
      },
      {
        header: '5ms',
        body: 'Potential 5G Edge latency'
      }
    ],
    48000: [
      {
        logo: 'map-pin.svg',
        header: '5G Edge is currently available in Atlanta, Boston, New York, San Francisco Bay Area and Washington DC.'
      }
    ],
    53000: [
      {
        logo: 'map-pin.svg',
        header: 'Verizon plans to add five more cities by year end.'
      }
    ]
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
