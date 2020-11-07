import { IDemo, E3DDemoNameVals } from '../../types'

export const indy: IDemo = {
  type: 'indy',
  intro: 'indy-intro.mp4',
  video: 'indy720.mp4',
  conversationId: '6299ec72-2b26-4730-8d9e-f532f1afae63',
  end: {
    header: 'Into the heart of the action.',
    body: 'Verizon is dedicated to bringing immersive and improved sports experiences to fans around the world.',
    expert: '',
    nextDemoText: 'Shot Tracker latency simulation',
    nextDemo: E3DDemoNameVals.shotTracker,
    nextDemoThumbnail: 'shotTrackerThumbnail.png'
  },
  timestamps: {
    0: [
      {
        header: 'Verizon 5G Ultra Wideband at the Indy 500'
      }
    ],
    5000: [
      {
        logo: 'star.svg',
        header: '400k fans',
        body: 'The Indianapolis Motor Speedway is the largest sporting venue in the world.'
      }
    ],
    10000: [
      {
        logo: 'monitor.svg',
        header: 'In the last 10 years, 6 million people on average tune in to the Indy 500.'
      }
    ],
    15000: [
      {
        logo: 'stock.svg',
        header: 'Real-time analysis',
        body:
          'Team Penske leveraged 5G Ultra Wideband during practice at last year’s race to analyze real-time performance of drivers coming in and out of the first turn.'
      }
    ],
    20000: [
      {
        logo: 'signal.svg',
        header: 'NBC Sports used footage from a 5G camera in their live broadcast.'
      }
    ],
    25000: [
      {
        logo: 'signal.svg',
        header:
          'The device, connected wirelessly using 5G Ultra Wideband, allowed NBC Sports producers to operate remotely.'
      }
    ],
    32000: [
      {
        logo: 'video.svg',
        header: '5G camera experiences were also leveraged for the Oscars and Super Bowl LIV earlier this year.'
      }
    ],
    38000: [
      {
        logo: 'timer.svg',
        header: '240 mph',
        body: 'IndyCar Series top speed'
      }
    ],
    43000: [
      {
        header: 'Need for speed',
        body: 'Arie Luyendyk set the current lap record at the Indy 500 in 1996.',
        items: [
          { header: '37.895 seconds', logo: 'timer.svg' },
          { header: '237.498 mph', logo: 'speedometer.svg' }
        ]
      }
    ],
    48000: [
      {
        logo: 'wifi.svg',
        header: 'New millimeter wave 5G router.',
        body: 'In September, Verizon released the 5G Internet Gateway for use in cities where 5G Home is available.'
      }
    ],
    53000: [
      {
        logo: 'up.svg',
        header:
          'Verizon’s 5G Ultra Wideband network is expected to someday be able to handle data volumes of up to 10TB/s per km².'
      }
    ]
  }
}
