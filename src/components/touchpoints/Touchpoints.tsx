import React, { FC, useEffect, useState } from 'react'
import { Button, Grid, makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { GameFlowSteps, ETouchpoints, IDemo, IDemoLinkConfig } from 'types'
import { PillButton } from 'components'
import { Video } from 'components/shared'
import classnames from 'classnames'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { GameFlowStepsConfig } from '../../helpers/steps'

const assetUrl = 'https://d1oc551tl862q5.cloudfront.net/'

interface ITouchpointsProps {
  demo: IDemo
  activeTouchpoint: ETouchpoints
  setScene: (sceneTo: GameFlowSteps) => void
  changeActiveTouchpoint: (part: ETouchpoints) => void
}

export const Touchpoints: FC<ITouchpointsProps> = ({ demo, activeTouchpoint, setScene, changeActiveTouchpoint }) => {
  const classes = useStyles()
  const [introTransitionActive, setIntroTransitionActive] = useState<boolean>(false)
  const [renderIntro, setRenderIntro] = useState<boolean>(false)
  const tpDataBlocks = demo.touchpoints?.[(activeTouchpoint || ETouchpoints.None) as string]
  const [renderDemo, setRenderDemo] = useState<boolean>(false)
  const [renderTouchpoint, setRenderTouchpoint] = useState<boolean>(!!activeTouchpoint)

  useEffect(() => {
    setRenderIntro(!!demo.intro)
    setIntroTransitionActive(!!demo.intro)
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
    setTimeout(() => {
      setRenderDemo(true)
    }, [GameFlowStepsConfig[GameFlowSteps.Robot].animation.time])

    return () => {
      changeActiveTouchpoint(ETouchpoints.None)
    }
  }, [demo])

  useEffect(() => {
    setRenderTouchpoint(false)
    setTimeout(() => {
      setRenderTouchpoint(true)
    })
  }, [activeTouchpoint])

  const actionClicked = action => {
    switch (action) {
      case 'explore':
        setScene(GameFlowSteps.BackToExplore)
        break
      case 'connect':
        window.postMessage('{"command":"connect", "param":"tata"}', '*')
        break
    }
  }

  function introEnded() {
    setIntroTransitionActive(false)
    setRenderIntro(false)
    setRenderDemo(true)
  }

  const goToTataDemoVideo = () => {
    setScene(GameFlowSteps.Demo)
  }

  return (
    <div className={classes.root}>
      {renderIntro && (
        <div
          className={classnames('video-containment', classes.intro, {
            [classes.transition]: introTransitionActive,
            [classes.transitionOut]: !introTransitionActive
          })}
        >
          <Video videoSrc={`${assetUrl}${demo.intro}`} onEnded={introEnded} autoPlay={true} />
        </div>
      )}
      {renderDemo && (
        <Grid className={classes.transition} container spacing={2}>
          {tpDataBlocks?.map(block => (
            <Grid item xs={12}>
              {true && (
                <div className={classes.transitionQuick}>
                  {block?.logo && (
                    <Grid item xs={12}>
                      <img src={require(`assets/demo/${block?.logo}`)} alt={block?.logo} />
                    </Grid>
                  )}
                  {block?.header && (
                    <Grid item xs={12}>
                      <Typography variant='h6' className={classes.preheading}>
                        {block?.preHeader}
                      </Typography>
                      {activeTouchpoint !== ETouchpoints.None && <div className={classes.weightedHeaderLine} />}
                      <Typography
                        variant={activeTouchpoint === ETouchpoints.None ? 'h2' : 'h3'}
                        className={classes.heading}
                      >
                        {block?.header}
                      </Typography>
                    </Grid>
                  )}

                  {block?.inlineBody1 && (
                    <Grid item xs={12}>
                      <Typography component='p' paragraph>
                        <strong>{block?.inlineBody1}</strong> {block?.inlineBody2}
                      </Typography>
                    </Grid>
                  )}

                  {block?.body && (
                    <Grid item xs={12}>
                      <Typography component='p' paragraph>
                        {block?.body}
                      </Typography>
                    </Grid>
                  )}

                  {/* {block.image && (
                    <Grid item xs={12}>
                      <img
                        alt={block?.header}
                        src={block.image}
                        key={block?.image}
                        className={classes.image}
                        style={{ backgroundImage: `url('${block.imgFallback}')` }}
                      />
                    </Grid>
                  )}

                  {block.links &&
                    block?.links?.map((linkAction: IDemoLinkConfig) => (
                      <Grid item xs={12}>
                        <Typography
                          onClick={() => {
                            actionClicked(linkAction.goTo)
                          }}
                          component='span'
                          classes={{ root: classes.demoLink }}
                        >
                          {linkAction.text}
                        </Typography>
                        <span
                          onClick={() => {
                            actionClicked(linkAction.goTo)
                          }}
                        >
                          <ArrowBackIcon fontSize='small' classes={{ root: classes.forwardArrow }} />
                        </span>
                      </Grid>
                    ))} */}
                </div>
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <div className={classes.contentActionBox}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  setScene(GameFlowSteps.BackToExplore)
                }}
              >
                Back
              </Button>

              <Button startIcon={<MailOutlineIcon />} onClick={() => actionClicked('connect')}>
                Send a message
              </Button>
            </div>
          </Grid>
        </Grid>
      )}
      {renderDemo && (
        <div className={classnames([classes.goToDemoVideoContainer, classes.transition])}>
          <span>
            <Typography component='p' className={classes.inline}>
              Learn more about the future of manufacturing.
            </Typography>
          </span>
          <span>
            <PillButton className={classes.inline} solid onClick={() => goToTataDemoVideo()}>
              Watch video
            </PillButton>
          </span>
        </div>
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
  introZIndex: {
    zIndex: 20000
  },
  root: {
    height: 'calc(100% - 105px)',
    width: 'calc(40% - 32px)',
    padding: '0 12.5% 0 6%',
    paddingTop: '120px',
    top: '105px',
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 1300,
    color: '#000',
    [theme.breakpoints.down('md')]: {
      width: 'calc(50% - 32px)'
    }
  },
  inline: {
    display: 'inline-block',
    margin: '10px'
  },
  weightedHeaderLine: {
    width: '100%',
    height: '2px',
    backgroundColor: 'black',
    marginTop: '8px',
    marginBottom: '8px'
  },
  preheading: {
    fontWeight: 700,
    fontSize: '1.125rem',
    lineHeight: '1.2',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.2'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '.6rem',
      lineHeight: '1.2'
    }
  },
  heading: {
    fontWeight: 700,
    // fontSize: '3.125rem',
    // lineHeight: '1.2',
    [theme.breakpoints.down('md')]: {
      // fontSize: '3rem',
      // lineHeight: '1.2'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      // fontSize: '2rem',
      // lineHeight: '1.2'
    }
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
  header: {
    fontSize: '34px',
    lineHeight: '1.2',
    fontWeight: 700
  },
  maxHeightWidth: {
    width: '100%',
    height: '100%'
  },
  subHeader: {
    fontSize: '20px',
    lineHeight: '1.2',
    fontWeight: 700
  },
  paragraph: {
    fontSize: '22px',
    lineHeight: '1.2'
  },
  demoContainer: {
    padding: '4rem 6rem 6rem 6rem'
  },
  centerContent: {
    padding: '4rem 2rem 6rem 0rem',
    height: '100%',
    alignContent: 'flex-start'
  },
  contentActionBox: {
    marginTop: 27,

    '& .MuiButton-root': {
      marginRight: theme.spacing(4),
      marginTop: 0,
      marginBottom: 0
    }
  },
  goToDemoVideoContainer: {
    position: 'fixed',
    bottom: '10px',
    right: '00px',
    marginRight: '80px'
  },
  transition: {
    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.75s'
  },
  transitionQuick: {
    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.5s'
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
  },
  image: {
    width: '100%'
  }
}))
