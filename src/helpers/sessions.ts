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
      schedule: '',
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
      header: 'Financial Services.',
      schedule: '',
      speakers: [
        'TJ Fox, SVP and President, Business Markets, Verizon Business Group',
        'Moderated by Ramon Ray - Entrepreneur and Author'
      ],
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  ctia: {
    image: wallsImage,
    video: 'sessions/ctia.mp4',
    poster: 'sessions/ctia.png',
    side: {
      category: 'Session',
      header: 'Retail/Hospitality, Travel & Distribution.',
      speakers: ['Ronan Dunne, Executive Vice President and Group CEO, Verizon Consumer Group'],
      schedule: '',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  IOT: {
    image: factoryImage,
    video: 'sessions/iot.mp4',
    poster: 'sessions/iot.png',
    side: {
      category: 'Session',
      header: 'Media, Entertainment, Technology & Service.',
      schedule: '',
      speakers: ['Steve Szabo, VP and Managing Partner, Wireless/IoT/Partnerships, Verizon Business Group'],
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  publicAndPrivateMEC: {
    image: tabletImage,
    video: 'sessions/publicprivatemec2.mp4',
    poster: 'sessions/publicprivatemec.png',
    side: {
      category: 'Session',
      header: 'Healthcare, Insurance & Life Sciences.',
      schedule: '',
      speakers: [
        'Thierry Sender, Director, Edge Compute and Managed Solutions Product Management, Verizon Business Group',
        'Bill Lambertson, Director, Global Cloud Solutions, IBM',
        'Marc Geall, SVP, Global Head of Platform & Technologies Ecosystem, GCO, SAP'
      ],
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  venues: {
    image: walkersImage,
    video: 'sessions/venues.mp4',
    poster: 'sessions/venues.png',
    side: {
      category: 'Session',
      header: 'Manufacturing, Automotive, Construction, Energy & Utilities.',
      speakers: [
        'David Aspinall, 5G MEC Strategy and IoT Business Development, Verizon Business Group',
        'Ray Gibson, VP of Engineering, CrowdVision Inc.',
        'Ken Martin, Executive Director of Sales, Cisco Sports and Entertainment'
      ],
      schedule: '',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  }
}
