import tabletImage from 'assets/sessions/tablet.png'
import walkersImage from 'assets/sessions/people-walking.png'
import factoryImage from 'assets/sessions/factory.png'
import smallBusiness from 'assets/sessions/small-business.png'
import wallsImage from 'assets/sessions/tunnel-walls.png'
import fiveGImage from 'assets/sessions/5g-bg.png'

export interface ISession {
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
  '5GBusiness': {
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
  '5GSmallBusiness': {
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
  ctia: {
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
  IOT: {
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
  publicAndPrivateMEC: {
    image: tabletImage,
    video: 'sessions/publicprivatemec2.mp4',
    poster: 'sessions/publicprivatemec.png',
    side: {
      category: 'Session',
      header: 'The Power of 5G Edge: Public and Private MEC',
      schedule: 'Tuesday, October 27 • 3–3:30 PM EST',
      speakers: [
        'Thierry Sender, Director, Edge Compute and Managed Solutions Product Management, Verizon Business Group',
        'Bill Lambertson, Director, Global Cloud Solutions, IBM',
        'Marc Geall, SVP, Global Head of Platform & Technologies Ecosystem, GCO, SAP'
      ],
      body:
        "An overview of Verizon's strategy and vision for public and private multi-access edge computing (MEC), key partnerships and impactful use cases."
    }
  },
  venues: {
    image: walkersImage,
    video: 'sessions/venues.mp4',
    poster: 'sessions/venues.png',
    side: {
      category: 'Session',
      header: 'The Digital Transformation of Venues',
      speakers: [
        'David Aspinall, 5G MEC Strategy and IoT Business Development, Verizon Business Group',
        'Ray Gibson, VP of Engineering, CrowdVision Inc.',
        'Ken Martin, Executive Director of Sales, Cisco Sports and Entertainment'
      ],
      schedule: 'Thursday, October 29 • 2:30–3 PM EST',
      body:
        'A look into how Verizon, Cisco and CrowdVision Inc. are collaborating to address fan safety and security concerns as venues contend with new challenges in this uncertain climate.'
    }
  }
}
