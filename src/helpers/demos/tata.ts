import { IDemo, ETouchpoints, E3DDemoNameVals } from '../../types'
import roboFrontImage from 'assets/touchpoints/tata-TCS.gif'
import roboFrontImageFallback from 'assets/touchpoints/thumbnail-robotFront.png'
import roboMiddleImage from 'assets/touchpoints/tata-overhead-assembly.gif'
import roboMiddleImageFallback from 'assets/touchpoints/thumbnail-robotMiddle.png'
import roboBackImage from 'assets/touchpoints/tata-assembly.gif'
import roboBackImageFallback from 'assets/touchpoints/thumbnail-robotBack.png'
// import aveshaImg from 'assets/demo/avesha.png'

export const tata: IDemo = {
  type: 'tata',
  intro: 'TCS-intro_720.mp4',
  video: 'Manufacturing_v1.mp4',
  conversationId: '5faff25c-bbd7-4503-8747-a29e2e971014',
  end: {
    header: 'The future of manufacturing.',
    body: '',
    expert: '',
    nextDemoText: 'Transforming the fan experience.',
    nextDemo: E3DDemoNameVals.ybvr,
    nextDemoThumbnail: 'ybvr-thumbnail.png'
  },
  touchpoints: {
    [ETouchpoints.None]: [
      {
        // preHeader: 'Demo',
        header: 'The future of manufacturing.',
        body: 'Click, drag and interact with the model to get a look into the factory of the future.'
      },
      {
        links: [
          {
            text: 'Send a message',
            goTo: 'connect'
          },
          {
            text: 'View all demos',
            goTo: 'explore'
          }
        ]
      }
    ],
    [ETouchpoints.RobotFrontArms]: [
      {
        logo: 'ticker.svg',
        header: 'Data analysis and action in near real-time',
        body: '',
        // 'With private MEC, data can be gathered and acted on right where it’s created—which can result in greater performance, contextually aware applications and improved security.'
        inlineBody1: 'Analysis:',
        inlineBody2: 'No defects detected'
      },
      {
        image: roboFrontImage,
        imgFallback: roboFrontImageFallback
      },
      {
        links: [
          {
            text: 'Send a message',
            goTo: 'connect'
          },
          {
            text: 'View all demos',
            goTo: 'explore'
          }
        ]
      }
    ],
    [ETouchpoints.RobotMiddle]: [
      {
        logo: 'wifi.svg',
        header: 'High-capacity data',
        inlineBody1: 'Devices on network:',
        inlineBody2: '2,675',
        body: '',
        // '5G is expected to eventually support up to 1M devices in a square kilometer, allowing thousands of sensors and devices on the factory floor to simultaneously send a continuous stream of data to the cloud.',
        video: ''
      },
      {
        image: roboMiddleImage,
        imgFallback: roboMiddleImageFallback
      },
      {
        links: [
          {
            text: 'Send a message',
            goTo: 'connect'
          },
          {
            text: 'View all demos',
            goTo: 'explore'
          }
        ]
      }
    ],
    [ETouchpoints.RobotScannerBox]: [
      {
        logo: 'gpu.svg',
        header: 'The Fourth Industrial Revolution',
        body: '',
        // '5G promises to enable transformative technologies like AI and automation to help launch the world into the Fourth Industrial Revolution.',
        inlineBody1: 'Automation:',
        inlineBody2: 'Quality control',
        video: ''
      },
      {
        image: roboBackImage,
        imgFallback: roboBackImageFallback
      },
      {
        links: [
          {
            text: 'Send a message',
            goTo: 'connect'
          },
          {
            text: 'View all demos',
            goTo: 'explore'
          }
        ]
      }
    ]
  }
}
