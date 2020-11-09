import tabletImage from 'assets/sessions/tablet.png'
import walkersImage from 'assets/sessions/people-walking.png'
import factoryImage from 'assets/sessions/factory.png'
import smallBusiness from 'assets/sessions/small-business.png'
import wallsImage from 'assets/sessions/tunnel-walls.png'
import fiveGImage from 'assets/sessions/5g-bg.png'

export interface ISession {
  id: string // Horan - this is a horrible way to do this, but under tight deadline
  image: string
  video?: string
  poster?: string
  side: {
    category: string
    header: string
    schedule: string
    body: string
    speakers?: string[]
  }
}

export const Sessions: { [key: string]: ISession } = {
  healthcareInsurance: {
    id: '4ab7c286-2a47-428c-8ca0-4cc765e153dd',
    image: fiveGImage,
    video: 'sessions/keynote.mp4',
    poster: 'sessions/keynote.png',
    side: {
      category: 'Keynote',
      header: 'The 5G Business\n has been Waiting for.',
      schedule: 'Wednesday, October 28 • 1–2 PM EST',
      speakers: ['Kyle Malady, EVP & CTO, Verizon'],
      body:
        "At Verizon we are building the 5G service that will be the 21st century infrastructure to shape the future. Join Verizon CTO Kyle Malady and special guests as they discuss Verizon's unique approach to 5G architecture and the impact it will have on the way we live, work, and play."
    }
  },
  retailTravelDistribution: {
    id: 'dc10cd28-efab-43c3-8cb7-b40402c0e78b',
    image: smallBusiness,
    video: 'sessions/smallbusiness.mp4',
    poster: 'sessions/smallbusiness.png',
    side: {
      category: 'Session',
      header: 'The Small Business Session: Steps Toward Digital Transformation',
      schedule: 'Wednesday, October 28 • 3–3:30 PM EST',
      speakers: [
        'TJ Fox, SVP and President, Business Markets, Verizon Business Group',
        'Moderated by Ramon Ray - Entrepreneur and Author'
      ],
      body:
        'A discussion about the challenges facing small businesses today, stories of adaptation and how Verizon is supporting transitioning to a 5G era.'
    }
  },
  financialServices: {
    id: '58a60c43-041f-4a6e-b1c9-d207ffd06c62',
    image: wallsImage,
    video: 'sessions/ctia.mp4',
    poster: 'sessions/ctia.png',
    side: {
      category: 'Session',
      header: 'The Transformative Power of Verizon 5G.',
      speakers: ['Ronan Dunne, Executive Vice President and Group CEO, Verizon Consumer Group'],
      schedule: 'Thursday, October 29 • 2:30–3 PM EST',
      body:
        'Verizon Consumer Group CEO Ronan Dunne’s powerful overview of what it means for Verizon to work at the Speed of Thought.'
    }
  },
  manufacturingEnergyUtilities: {
    id: 'aa4195e4-e9cd-483c-b6be-ad205d176227',
    image: factoryImage,
    video: 'sessions/iot.mp4',
    poster: 'sessions/iot.png',
    side: {
      category: 'Session',
      header: 'Everything Connects: IoT and the Evolution of 5G',
      schedule: 'Wednesday, October 28 • 2:30-3PM EST',
      speakers: ['Steve Szabo, VP and Managing Partner, Wireless/IoT/Partnerships, Verizon Business Group'],
      body: "Insights into the powerful ecosystem possibilities with Verizon's 5G Nationwide and 5G Ultra Wideband."
    }
  },
  mediaEntertainmentTech: {
    id: '4a9b328b-85b5-4393-a232-550ac67962f9',
    image: factoryImage,
    video: 'sessions/iot.mp4',
    poster: 'sessions/iot.png',
    side: {
      category: 'Session',
      header: 'Everything Connects: IoT and the Evolution of 5G',
      schedule: 'Wednesday, October 28 • 2:30-3PM EST',
      speakers: ['Steve Szabo, VP and Managing Partner, Wireless/IoT/Partnerships, Verizon Business Group'],
      body: "Insights into the powerful ecosystem possibilities with Verizon's 5G Nationwide and 5G Ultra Wideband."
    }
  }
}
