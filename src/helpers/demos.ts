import { E3DDemoNameVals, IDemoCollection } from '../types'
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
import iceImg from 'assets/demo/icePoster.png'
import zixiImg from 'assets/demo/zixiPoster.png'

export const Demos: IDemoCollection = {
  '5GCoverage': fiveGCoverage,
  '5StatesOfReady': {
    type: '5StatesOfReady',
    video: '5statesofready720.mp4',
    poster: FivestatesofreadyImg,
    conversationId: '1d26e076-954e-4455-bf28-cc964f633f3d',
    end: {
      header: 'The 5 States of Ready',
      body:
        "How do you prepare for a future that can't be seen? By assessing your needs using the 5 states of ready framework—Verizon’s approach to enhancing the agility, security and mobility of all our customers.\n",
      nextDemoText: '5G Ultra Wideband and 5G Nationwide.',
      nextDemo: E3DDemoNameVals.fiveGCoverage,
      nextDemoThumbnail: 'fiveGCoverageThumbnail.png'
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
    end: {
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
    end: {
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
    end: {
      header: 'Speed of Thought',
      body:
        "Each generation of wireless technology brings us closer together.  Now, at the dawn of 5G, visionaries are evolving the mission of connectivity to tackle some of society's biggest challenges. From robotic devices that could allow doctors to perform surgeries thousands of miles away to a smart city that aims to eliminate pedestrian deaths, innovators are using 5G to change the world as we know it.\n" +
        '<br/><br/>' +
        'Visit <a target="_blank" href="https://speedofthoughtfilm.com">speedofthoughtfilm.com</a> for viewing options '
    }
  },
  shotTracker,
  tata,
  ybvr,
  zixi: {
    type: 'zixi',
    video: 'Zixi.mp4',
    poster: zixiImg,
    end: {
      header: 'Zixi',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.\n' +
        '<br/><br/>' +
        'Visit <a target="_blank" href="https://zixi.com">zixi.com</a> for viewing options '
    }
  },
  iceMobility: {
    type: 'iceMobility',
    video: 'IceMobility.mp4',
    poster: iceImg,
    end: {
      header: 'Ice Mobility',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit risus ut nulla fringilla, id lobortis ligula scelerisque. Pellentesque porta lacus non velit ultricies, at vulputate magna ultricies. Sed tincidunt orci vitae turpis ultricies posuere. Pellentesque ultrices diam quis urna interdum.\n' +
        '<br/><br/>' +
        'Visit <a target="_blank" href="https://icemobility.com">icemobility.com</a> for viewing options '
    }
  }
}
