import { IDemo, E3DDemoNameVals } from '../../types'

export const shotTracker: IDemo = {
  type: 'shottracker',
  intro: 'ShotTracker-intro_720.mp4',
  video: 'shottracker720.mp4',
  conversationId: '9218554c-0bc0-4e61-b6f8-0fef42d984a1',
  end: {
    header: 'The future is here.',
    body: 'Learn how 5G and MEC can help breathe life into organizations’ more daring ideas.',
    nextDemoText: 'The transformation of healthcare',
    nextDemo: E3DDemoNameVals.avesha,
    nextDemoThumbnail: 'avesha-thumbnail.png',
    expert: ''
  },
  timestamps: {
    0: [
      {
        header: 'ShotTracker 5G and MEC'
      }
    ],
    6000: [
      {
        logo: 'lightning.svg',
        header: 'MEC has the power to transform the world of sports by providing real time performance data'
      }
    ],
    10000: [
      {
        logo: 'bullseye.svg',
        header: '89%',
        body: 'of basketball coaches want better player stats'
      }
    ],
    15000: [
      {
        logo: 'clock.svg',
        header: '70+',
        body: 'unique statistics tracked with ShotTracker',
        items: [{ header: 'Delivering box scores' }, { header: 'Shot Charts' }, { header: 'Advanced analytics' }]
      }
    ],
    23000: [
      {
        header: 'ShotTracker components',
        items: [
          { header: 'A player sensor', logo: 'signal.svg' },
          { header: 'ShotTracker enabled ball', logo: 'sensor.svg' },
          { header: 'Sensors placed around the facility', logo: 'network.svg' }
        ]
      }
    ],
    30000: [
      {
        logo: 'scale.svg',
        header: 'Player sensors are smaller and lighter than an empty pack of TicTacs.'
      }
    ],
    36000: [
      {
        header: 'Latency simulation',
        body: 'See how latency affects data transfer in this comparion.'
      },
      {
        items: [
          { header: '4G', video: '4G_noAudio.mp4', image: '4G-wave.png', gWidth: 5 },
          { header: '5G', video: '5G_noAudio.mp4', image: '5G-wave.png', gWidth: 5 },
          { header: '60ms', logo: 'speedometer.svg', gWidth: 5 },
          { header: '10ms', logo: 'speedometer.svg', gWidth: 5 }
        ]
      }
    ],
    45000: [
      {
        logo: 'merge.svg',
        header: 'Coaches can simultaneously track each individual’s performance.'
      }
    ],
    48000: [
      {
        logo: 'mobile.svg',
        header: '1 in 3',
        body: 'NBA fans are expected to use the internet to track live scores.'
      }
    ],
    53000: [
      {
        logo: 'flag.svg',
        header: 'Over 450 million NBA fans '
      }
    ]
  }
}
