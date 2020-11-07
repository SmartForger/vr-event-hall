import { IDemoCollection } from '../types'
import { tata } from './demos/tata'
import { mecExplainer } from './demos/mec'
import { indy } from './demos/indy'
import { shotTracker } from './demos/shotTracker'
import { ybvr } from './demos/ybvr'
import { fiveGCoverage } from './demos/5GCoverage'

import FivestatesofreadyImg from 'assets/demo/5statesofready.png'
import aveshaImg from 'assets/demo/avesha.png'
import crowdvisionImg from 'assets/demo/crowdvision.png'
import sotImg from 'assets/demo/sot.png'

export const Demos: IDemoCollection = {
  '5GCoverage': fiveGCoverage,
  '5StatesOfReady': {
    type: '5StatesOfReady',
    video: '5statesofready720.mp4',
    poster: FivestatesofreadyImg,
    conversationId: '1d26e076-954e-4455-bf28-cc964f633f3d',
    side: {
      header: 'The 5 States of Ready',
      body:
        "How do you prepare for a future that can't be seen? By assessing your needs using the 5 states of ready framework—Verizon’s approach to enhancing the agility, security and mobility of all our customers.\n"
    },
    poll: {
      id: '5statesofready',
      header: 'At what stage is your business in the 5 states of Ready?',
      options: [
        { label: 'Start' },
        { label: 'Adapt' },
        { label: 'Elevate' },
        { label: 'Innovate' },
        { label: 'Disrupt' }
      ]
    }
  },
  avesha: {
    type: 'avesha',
    video: 'avesha720.mp4',
    poster: aveshaImg,
    conversationId: 'a4870c64-eabb-44a2-9d64-74384570439a',
    side: {
      title: '5G MEC',
      header: 'The transformation of healthcare.',
      body:
        'Avesha Systems is working with several hospitals to test how machine learning inference done at the edge utilizing Wavelength and Verizon 5G can assist doctors in identifying polyps in real-time.'
    }
  },
  crowdVision: {
    type: 'crowdVision',
    intro: 'crowdvision-intro.mp4',
    video: 'crowdvision720.mp4',
    poster: crowdvisionImg,
    conversationId: 'ccc0fec7-4bdc-4dc4-8356-1406276294dd',
    side: {
      title: 'SOLUTION',
      header: '5G MEC and Smart Venues',
      body:
        'CrowdVision uses sensors to generate highly detailed pictures of crowds in public places. Installing the product, though, typically required miles of Ethernet cable, racks full of servers and very high bandwidth. Now, using Verizon 5G Edge and AWS Wavelength for processing and backbone is significantly opening up opportunities for CrowdVision to place equipment at more venues, helping improve safety and comfort.'
    }
  },
  indy,
  mecExplainer,
  sot: {
    type: 'sot',
    video: 'sot720.mp4',
    poster: sotImg,
    side: {
      header: 'Speed of Thought',
      body:
        "Each generation of wireless technology brings us closer together.  Now, at the dawn of 5G, visionaries are evolving the mission of connectivity to tackle some of society's biggest challenges. From robotic devices that could allow doctors to perform surgeries thousands of miles away to a smart city that aims to eliminate pedestrian deaths, innovators are using 5G to change the world as we know it.\n" +
        '<br/><br/>' +
        'Visit <a href="https://speedofthoughtfilm.com">speedofthoughtfilm.com</a> for viewing options '
    }
  },
  shotTracker,
  tata,
  ybvr
}
