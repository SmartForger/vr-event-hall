import tabletImage from 'assets/sessions/tablet.png'
import walkersImage from 'assets/sessions/people-walking.png'
import factoryImage from 'assets/sessions/factory.png'
import smallBusiness from 'assets/sessions/small-business.png'
import wallsImage from 'assets/sessions/tunnel-walls.png'
import fiveGImage from 'assets/sessions/5g-bg.png'

export interface ISession {
  id: string // Horan - this is a horrible way to do this, but under tight deadline
  image: string
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
    side: {
      image: 'tabletImage',
      category: 'Breakout Session',
      header: 'Healthcare, Insurance & Life Sciences.',
      schedule: 'Weekday, November XX • X–X PM EST',
      speakers: [],
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  retailTravelDistribution: {
    id: 'dc10cd28-efab-43c3-8cb7-b40402c0e78b',
    side: {
      image: 'walkersImage',
      category: 'Breakout Session',
      header: 'Retail/Hospitality, Travel & Distribution.',
      schedule: 'Weekday, November XX • X–X PM EST',
      speakers: [],
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  financialServices: {
    id: '58a60c43-041f-4a6e-b1c9-d207ffd06c62',
    side: {
      image: 'factoryImage',
      category: 'Breakout Session',
      header: 'Financial Services.',
      speakers: [],
      schedule: 'Weekday, November XX • X–X PM EST',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  manufacturingEnergyUtilities: {
    id: 'aa4195e4-e9cd-483c-b6be-ad205d176227',
    side: {
      image: 'smallBusiness',
      category: 'Breakout Session',
      header: 'Manufacturing, Automotive, Construction, Energy & Utilities.',
      schedule: 'Weekday, November XX • X–X PM EST',
      speakers: [],
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.'
    }
  },
  mediaEntertainmentTech: {
    id: '4a9b328b-85b5-4393-a232-550ac67962f9',
    side: {
      image: 'wallsImage',
      category: 'Breakout Session',
      header: 'Media, Entertainment, Technology & Service.',
      schedule: 'Weekday, November XX • X–X PM EST',
      speakers: [],
      body: "Insights into the powerful ecosystem possibilities with Verizon's 5G Nationwide and 5G Ultra Wideband."
    }
  }
}
