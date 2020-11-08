import React, { FC, useEffect, useState } from 'react'
import { Box, Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { GameFlowSteps, IUser } from 'types'
import { Video } from 'components/shared'
import { GameFlowStepsConfig } from 'helpers/steps'
import { IDemo, ITimestamp, IDemoLinkConfig } from 'types'
import classnames from 'classnames'
import { get } from 'lodash'
import { Poll } from 'components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Demos } from '../../helpers'
import { I18n } from 'aws-amplify'

interface DemoProps {
  demo: IDemo
  setScene: (sceneTo: GameFlowSteps) => void
  user?: IUser
}

export const Demo: FC<DemoProps> = ({ demo, setScene, user }) => {
  const classes = useStyles()
  const assetUrl = 'https://d1oc551tl862q5.cloudfront.net/'
  const [introTransitionActive, setIntroTransitionActive] = useState<boolean>(false)
  const [renderIntro, setRenderIntro] = useState<boolean>(false)
  const [renderDemo, setRenderDemo] = useState<boolean>(false)
  const [activeTimestamp, setActiveTimestamp] = useState<Array<ITimestamp>>((demo.timestamps || {})[0])
  const [displayPoll, setDisplayPoll] = useState<boolean>(false)
  const [videoConcluded, setVideoConcluded] = useState<boolean>(false)
  const [autoPlay, setAutoPlay] = useState<boolean>(demo.type === '5GCoverage')

  useEffect(() => {
    // if the desired demo switches without unmount/mount from here,
    // reset this component manually to start at the begining of the new demo
    setDisplayPoll(false)
    setVideoConcluded(false)
    setAutoPlay(demo.type === '5GCoverage')
    setIntroTransitionActive(!!demo.intro)
    setRenderIntro(!!demo.intro)
    setActiveTimestamp((demo.timestamps || {})[0])

    if (!demo.intro) {
      setTimeout(() => {
        setRenderDemo(true)
      }, GameFlowStepsConfig[GameFlowSteps.Demo].animation.time)
    } else {
      setTimeout(() => {
        setRenderIntro(true)
        setRenderDemo(false)
        setIntroTransitionActive(true)
      }, GameFlowStepsConfig[GameFlowSteps.Demo].animation.time)
    }
  }, [demo])

  function checkVideoTime(videoPlayer) {
    //@ts-ignore
    const currentTime = Math.floor(get(videoPlayer, 'video.video.currentTime', 0)) * 1000
    const ended = Math.floor(get(videoPlayer, 'video.video.ended', true))

    if (ended) {
      console.log('video ended')
    } else if (demo.timestamps) {
      if (demo.timestamps[currentTime]) {
        setActiveTimestamp(demo.timestamps[currentTime])
      }
      setTimeout(() => {
        checkVideoTime(videoPlayer)
      }, 500)
    }
  }

  function introEnded() {
    setIntroTransitionActive(false)
    setIntroTransitionActive(false)
    setRenderIntro(false)
    setRenderDemo(true)
    setAutoPlay(true)
  }

  function videoEnded() {
    if (demo === Demos.tata && !renderIntro) {
      setScene(GameFlowSteps.Robot)
    }

    setVideoConcluded(true)

    if (demo.poll) {
      setDisplayPoll(true)
    }
  }

  const actionClicked = (action, param?) => {
    switch (action) {
      case 'expert':
        window.postMessage(JSON.stringify({ command: 'chat', param: param }), '*')
        break
      case 'explore':
        setScene(GameFlowSteps.BackToExplore)
        break
      case 'connect':
        window.postMessage(JSON.stringify({ command: 'connect', param: param }), '*')
        break
      case 'demo':
        // this will trigger the useEffect(() => ..., [demo]) to trigger which will reset the compoennt
        window.postMessage(JSON.stringify({ command: 'demos', param: param }), '*')
        break
    }
  }

  const buildLink = (linkConfig: IDemoLinkConfig, classN?) => {
    return (
      <Grid item xs={12} sm={linkConfig.colSize || 12} className={classN ? classN : ''}>
        <Typography
          onClick={() => {
            actionClicked(linkConfig.goTo, linkConfig.param)
          }}
          component='span'
          classes={{ root: classes.demoLink }}
        >
          {linkConfig.text}
        </Typography>
        <span
          onClick={() => {
            actionClicked(linkConfig.goTo, linkConfig.param)
          }}
        >
          <ArrowBackIcon fontSize='small' classes={{ root: classes.forwardArrow }} />
        </span>
      </Grid>
    )
  }

  const buildEndVideoSideLayout = content => (
    <Grid xs={4} lg={3} className={classes.endContainer} container direction={'column'}>
      <Grid xs={6} className={classes.endContentContainer} container alignItems='center' direction='row'>
        {content.logo && (
          <Grid item xs={12}>
            <img src={require(`assets/demo/${content.logo}`)} alt={content.logo} />
          </Grid>
        )}
        {content.header && (
          <Grid item xs={12}>
            <Typography
              variant='h1'
              className={classnames(classes.header, {
                [classes.fontSize48]:
                  (!content.logo && !content.body && !content.items && content.header.length < 40) ||
                  content.header.length < 4,
                [classes.headerList]: !content.body && content.items
              })}
            >
              <span dangerouslySetInnerHTML={{ __html: content.header }} />
            </Typography>
          </Grid>
        )}
        {content.body && (
          <Grid item xs={12}>
            <Typography component='p' className={classes.body} paragraph>
              <span dangerouslySetInnerHTML={{ __html: content.body }} />
            </Typography>
          </Grid>
        )}
        <Grid xs={12} container direction={'row'} alignItems='flex-end'>
          {buildLink({ text: 'Send a message', goTo: 'connect' }, classes.textAlignRight)}
        </Grid>
      </Grid>
      {/* break and then next demo */}
      <Grid xs={6} className={classes.endContentContainer} container alignItems='center' direction='row'>
        {content.nextDemo && (
          <>
            <Grid xs={12} container direction={'row'} alignItems='flex-end'>
              <Grid item xs={6}>
                <Typography variant='h1' className={classnames(classes.subHeader)}>
                  Next demo
                </Typography>
              </Grid>
              {buildLink({ text: 'View all demos', goTo: 'explore', colSize: 6 }, classes.textAlignRight)}
            </Grid>
            <Box flexGrow={1}>
              <img
                className={classes.thumbnail}
                src={require(`assets/demo/${content.nextDemoThumbnail}`)}
                alt='Demo thumbnail'
                onClick={() => actionClicked('demo', content.nextDemo)}
              />
            </Box>
            <Grid item xs={12}>
              <Typography variant='h2' className={classnames(classes.subHeader)}>
                {content.nextDemoText}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )

  return (
    <div className={classnames(classes.root, { [classes.introZIndex]: renderIntro })}>
      {renderIntro && (
        <div
          className={classnames('video-containment', classes.intro, {
            [classes.transition]: introTransitionActive,
            [classes.transitionOut]: !introTransitionActive,
            [classes.maxHeightWidth]: displayPoll
          })}
        >
          <Video videoSrc={`${assetUrl}${demo.intro}`} onEnded={introEnded} autoPlay={true} />
        </div>
      )}
      {renderDemo && activeTimestamp && (
        <Grid
          className={classnames(classes.transition, classes.mainContainer, { [classes.maxHeightWidth]: displayPoll })}
          container
          direction='row'
        >
          {!displayPoll && (
            <Grid item xs={8} lg={9} className={classnames(classes.demoContainer)}>
              <Video
                videoSrc={`${assetUrl}${demo.video}`}
                posterSrc={demo.poster || ''}
                onEnded={videoEnded}
                autoPlay={autoPlay}
                checkVideoTime={checkVideoTime}
              />
              <Box display='flex' className={classes.contentActionBox}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setScene(GameFlowSteps.BackToExplore)
                  }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          )}
          {displayPoll && demo.poll && (
            <Grid item xs={8} lg={9} className={classes.demoContainer}>
              <Poll poll={demo.poll} user={user} />
              <Box display='flex' className={classes.contentActionBox}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setScene(GameFlowSteps.BackToExplore)
                  }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          )}
          {activeTimestamp && !videoConcluded && (
            <Grid item xs={4} lg={3}>
              <Grid className={classes.centerContent} container direction='row'>
                {activeTimestamp.map(content => {
                  return (
                    <Grid className={classes.contentContainer} container direction='row'>
                      {content.logo && (
                        <Grid item xs={12}>
                          <img src={require(`assets/demo/${content.logo}`)} alt={content.logo} />
                        </Grid>
                      )}
                      {content.header && (
                        <Grid item xs={12}>
                          <Typography
                            variant='h1'
                            className={classnames(classes.header, {
                              [classes.fontSize48]:
                                (!content.logo && !content.body && !content.items && content.header.length < 40) ||
                                content.header.length < 4,
                              [classes.headerList]: !content.body && content.items
                            })}
                          >
                            <span dangerouslySetInnerHTML={{ __html: content.header }} />
                          </Typography>
                        </Grid>
                      )}
                      {content.body && (
                        <Grid item xs={12}>
                          <Typography component='p' className={classes.body} paragraph>
                            <span dangerouslySetInnerHTML={{ __html: content.body }} />
                          </Typography>
                        </Grid>
                      )}
                      {content.list && (
                        <ul>
                          {content.list.map(item => {
                            return (
                              <li className={classes.body}>
                                <span> {item} </span>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      {content.items && (
                        <Grid container justify='space-between'>
                          {content.items.map(subItem => {
                            return (
                              <Grid
                                className={classes.itemsContainer}
                                container
                                direction='row'
                                md={subItem.gWidth || 12}
                                justify='space-between'
                              >
                                <Grid item xs={12} classes={{ root: classes.inlineDisplay }} alignItems='center'>
                                  {/* logo */}
                                  {subItem.logo && (
                                    <img
                                      className={classes.subLogo}
                                      src={require(`assets/demo/${subItem.logo}`)}
                                      alt={subItem.logo}
                                    />
                                  )}
                                  {/* heading */}
                                  <Typography variant='h2' className={classes.subHeader}>
                                    {subItem.header}
                                  </Typography>
                                </Grid>

                                {/* Video */}
                                <Grid item xs={12}>
                                  {subItem.video && (
                                    <Video
                                      videoSrc={require(`assets/demo/${subItem.video}`)}
                                      autoPlay={true}
                                      autoLoop={true}
                                      disableControls={true}
                                    />
                                  )}
                                </Grid>

                                {/* Image */}
                                <Grid item xs={12}>
                                  {subItem.video && (
                                    <img
                                      src={require(`assets/demo/${subItem.image}`)}
                                      alt={content.logo}
                                      className={classes.containedImage}
                                    />
                                  )}
                                </Grid>
                              </Grid>
                            )
                          })}
                        </Grid>
                      )}
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          )}
          {videoConcluded && demo.end && buildEndVideoSideLayout(demo.end)}
        </Grid>
      )}
      {renderDemo && !activeTimestamp && (
        <Grid className={classes.transition} container justify={'space-between'} spacing={2}>
          <Grid
            className={classes.videoRightContent}
            container
            item
            direction='column'
            alignItems='flex-start'
            justify='center'
            xs={5}
          >
            {demo.side?.title && (
              <Typography component='h5' variant='h5' color='textPrimary' gutterBottom>
                {demo.side?.title}
              </Typography>
            )}
            <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
              {demo.side?.header}
            </Typography>
            <Typography
              component='p'
              variant='body2'
              color='textPrimary'
              gutterBottom
              dangerouslySetInnerHTML={{ __html: demo.side?.body || '' }}
            />
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setScene(GameFlowSteps.BackToExplore)
              }}
            >
              Back
            </Button>
          </Grid>
          {displayPoll && demo.poll && (
            <Grid item xs={7} className={classes.padding}>
              <Poll poll={demo.poll} user={user} />
            </Grid>
          )}
          {!displayPoll && (
            <Grid item xs={7} className={classes.videoRight}>
              {demo.video && (
                <Video
                  videoSrc={`${assetUrl}${demo.video}`}
                  posterSrc={demo.poster || ''}
                  autoPlay={autoPlay}
                  onEnded={videoEnded}
                />
              )}
            </Grid>
          )}
        </Grid>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  intro: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20000,
    display: 'flex',
    background: '#000',
    justifyContent: 'center',
    flexDirection: 'column',
    '& .video-react-control-bar': {
      display: 'none !important'
    }
  },
  root: {
    height: 'calc(100% - 115px)',
    width: 'calc(100% - 64px)',
    top: '115px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#000',
    justifyContent: 'center',
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      top: 40
    }
  },
  introZIndex: {
    zIndex: 20000
  },
  mainContainer: {
    maxWidth: 1530
  },
  maxHeightWidth: {
    width: '100%',
    height: '100%'
  },
  containedImage: {
    width: '100%'
  },
  columnCenter: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  thumbnail: {
    cursor: 'pointer',
    width: '100%'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  forwardArrow: {
    position: 'relative',
    top: '2px',
    left: '4px',
    WebkitTransform: 'rotate(180deg)',
    transform: 'rotate(180deg)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  demoLink: {
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'Verizon-Bold'
  },
  videoRight: {
    padding: '5rem !important',
    '& .MuiGrid-item': {
      padding: '3rem !important'
    },
    [theme.breakpoints.down('md')]: {
      padding: '3rem !important'
    }
  },
  videoRightContent: {
    padding: '5rem !important',
    '& .MuiGrid-item': {
      padding: '3rem !important'
    },
    '& a': {
      color: '#000'
    },
    [theme.breakpoints.down('md')]: {
      padding: '3rem !important'
    }
  },
  padding: {
    padding: '3rem 5rem !important',
    '& h4': {
      paddingRight: '0 !important',
      fontSize: 32
    }
  },
  inlineDisplay: {
    display: 'inline-flex'
  },
  header: {
    fontSize: '34px',
    lineHeight: '1.2',
    fontWeight: 700,
    [theme.breakpoints.only('md')]: {
      fontSize: '28px !important'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px !important'
    }
  },
  fontSize48: {
    fontSize: '48px',
    lineHeight: '1.2'
  },
  body: {
    [theme.breakpoints.only('md')]: {
      fontSize: '16px !important'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px !important'
    }
  },
  itemsContainer: {
    paddingBottom: '1rem'
  },
  subHeader: {
    fontSize: '20px',
    lineHeight: '1.2',
    fontWeight: 700
  },
  headerList: {
    paddingBottom: '2rem'
  },
  subLogo: {
    height: '20px',
    marginRight: '1.5rem'
  },
  paragraph: {
    fontSize: '22px',
    lineHeight: '1.2'
  },
  demoContainer: {
    padding: '4rem 5rem 6rem 5rem',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      paddingRight: '4rem',
      paddingLeft: '4rem'
    },
    [theme.breakpoints.only('sm')]: {
      paddingRight: '3rem',
      paddingLeft: '3rem'
    },
    [theme.breakpoints.only('xs')]: {
      paddingRight: '2rem',
      paddingLeft: '2rem'
    }
  },
  centerContent: {
    padding: '0 6rem 0 0',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  endContainer: {
    padding: '4rem 5rem 6rem 0rem',
    justifyContent: 'center',
    minHeight: '100%',
    [theme.breakpoints.down('lg')]: {
      paddingRight: '4rem'
    },
    [theme.breakpoints.only('sm')]: {
      paddingRight: '3rem'
    },
    [theme.breakpoints.only('xs')]: {
      paddingRight: '2rem'
    }
  },
  contentContainer: {
    '&:nth-child(2)': {
      paddingTop: '3rem'
    },
    '& .MuiGrid-item': {
      padding: '5px 0'
    }
  },
  endContentContainer: {
    maxWidth: '100%',
    minHeight: '50%',
    '&:nth-child(2)': {
      borderTop: '1px solid #DBDBDB'
    },
    '& .MuiGrid-item': {
      padding: '5px 0'
    }
  },
  contentActionBox: {
    marginTop: 27
  },
  transition: {
    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.75s'
  },
  transitionOut: {
    animationName: '$fadeOutOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-out',
    animationDuration: '0.75s',
    opacity: 0
  },
  '@keyframes fadeInOpacity': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  },
  '@keyframes fadeOutOpacity': {
    '0%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  }
}))
