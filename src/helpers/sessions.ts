import manufacturingImage from 'assets/sessions/Breakout-Manufacturing.png'
import travelRetailImage from 'assets/sessions/Breakout-Travel-Retail.png'
import mediaImage from 'assets/sessions/Breakout-Media.png'
import financialServicesImage from 'assets/sessions/Breakout-Financial-Services.png'
import healthcareServicesImage from 'assets/sessions/Breakout-Healthcare-Insurance.png'

export interface ISession {
  id: string // Horan - this is a horrible way to do this, but under tight deadline
  image: string
  side: {
    category: string
    header: string
    shortHeader: string
    schedule: string
    body: string
    speakers?: string[]
    chatBody: string
  }
}

export const Sessions: { [key: string]: ISession } = {
  healthcareInsurance: {
    id: '4ab7c286-2a47-428c-8ca0-4cc765e153dd',
    image: healthcareServicesImage,
    side: {
      category: 'Breakout Session',
      header: 'Healthcare, Insurance & Life Sciences.',
      shortHeader: 'Healthcare',
      schedule: 'Session will begin immediately following the live stream.',
      speakers: [],
      body:
        '5G Edge will enable AI, near real time connectivity and other new technologies and capabilities for healthcare. This session will cover the implications of 5G edge on healthcare, insurance and life sciences, what organizations need to do to prepare and how they can partner with Verizon on 5G innovation.',
      chatBody:
        'This session will cover the implications of 5G edge on healthcare, what organizations need to do to prepare and how they can partner with Verizon on 5G innovation.'
    }
  },
  retailTravelDistribution: {
    id: 'dc10cd28-efab-43c3-8cb7-b40402c0e78b',
    image: travelRetailImage,
    side: {
      category: 'Breakout Session',
      header: 'Retail/Hospitality, Travel & Distribution.',
      shortHeader: 'Retail',
      schedule: 'Session will begin immediately following the live stream.',
      speakers: [],
      body:
        '5G Edge will usher in the ability to create unique, branded customer experiences, increase operational efficiency and provide holistic supply chain visibility by enabling AI/ML, near real-time connectivity and other new capabilities for retail, travel and distribution. This session will cover the implications of 5G Edge for the Retail, Travel and Distribution industries.',
      chatBody:
        'This session will cover the implications of 5G Edge for the Retail, Travel and Distribution industries, as well as what organizations need to do to prepare for 5G and edge compute and how to partner with Verizon to achieve success.'
    }
  },
  financialServices: {
    id: '58a60c43-041f-4a6e-b1c9-d207ffd06c62',
    image: financialServicesImage,
    side: {
      category: 'Breakout Session',
      header: 'Financial Services.',
      shortHeader: 'Financial Services',
      speakers: [],
      schedule: 'Session will begin immediately following the live stream.',
      body:
        '5G Edge will enable highly secure, near real-time connectivity, AI/ML and other new technologies for Financial Services. This session will discuss timely 5G Edge use cases in the financial services industry and how organizations can engage with Verizon to begin their pathway to 5G.',
      chatBody:
        'This session will discuss timely 5G Edge use cases in the financial services industry and how organizations can engage with Verizon to begin their pathway to 5G.'
    }
  },
  manufacturingEnergyUtilities: {
    id: 'aa4195e4-e9cd-483c-b6be-ad205d176227',
    image: manufacturingImage,
    side: {
      category: 'Breakout Session',
      header: 'Manufacturing, Automotive, Construction, Energy & Utilities.',
      shortHeader: 'Manufacturing',
      schedule: 'Session will begin immediately following the live stream.',
      speakers: [],
      body:
        '5G Edge will enable advanced manufacturing, GT&D infrastructure transformation, accelerated outcomes using ML & AI as well as additional capabilities for industry. This session will cover the implications of 5G edge for industrial systems and what organizations need to do to prepare as well as how to partner with Verizon to achieve success.',
      chatBody:
        'This session will cover the implications of 5G edge for industrial systems and what organizations need to do to prepare as well as how to partner with Verizon to achieve success.'
    }
  },
  mediaEntertainmentTech: {
    id: '4a9b328b-85b5-4393-a232-550ac67962f9',
    image: mediaImage,
    side: {
      category: 'Breakout Session',
      header: 'Media, Entertainment, Technology & Service.',
      shortHeader: 'Media',
      schedule: 'Session will begin immediately following the live stream.',
      speakers: [],
      body:
        '5G Edge will help Media and Entertainment companies transform the way they operate, deliver core services, keep fans and audiences engaged, and enhance end user experiences. This session discusses the implications of 5G edge for M&E and the role it will play in building out future-ready venues, transforming content contribution-distribution models, and strengthening fan affinity and audience engagement.',
      chatBody:
        'This session discusses the implications of 5G edge for Media and Entertainment and the role it will play in building out future-ready venues, transforming content contribution-distribution models, and strengthening fan affinity and audience engagement.'
    }
  }
}

export const findSessionById = (id: string) => {
  for (let key in Sessions) {
    const session = Sessions[key]
    if (session.id === id) {
      return session
    }
  }
}
