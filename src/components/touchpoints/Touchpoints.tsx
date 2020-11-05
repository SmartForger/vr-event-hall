import React, { FC, useEffect, useState } from 'react'
import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { GameFlowSteps, ETouchpoints, IDemo, IDemoLinkConfig } from 'types'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { GameFlowStepsConfig } from '../../helpers/steps'

interface ITouchpointsProps {
  demo: IDemo
  activeTouchpoint: ETouchpoints
  setScene: (sceneTo: GameFlowSteps) => void
  changeActiveTouchpoint: (part: ETouchpoints) => void
}

export const Touchpoints: FC<ITouchpointsProps> = ({ demo, activeTouchpoint, setScene, changeActiveTouchpoint }) => {
  const classes = useStyles()
  const tpDataBlocks = demo.touchpoints?.[(activeTouchpoint || ETouchpoints.None) as string]
  const [renderDemo, setRenderDemo] = useState<boolean>(false)
  const [renderTouchpoint, setRenderTouchpoint] = useState<boolean>(!!activeTouchpoint)

  useEffect(() => {
    setTimeout(() => {
      setRenderDemo(true)
    }, [GameFlowStepsConfig[GameFlowSteps.Robot].animation.time])

    return () => {
      changeActiveTouchpoint(ETouchpoints.None)
    }
  }, [])

  useEffect(() => {
    setRenderTouchpoint(false)
    setTimeout(() => {
      setRenderTouchpoint(true)
    })
  }, [activeTouchpoint])

  const actionClicked = action => {
    switch (action) {
      case 'expert':
        window.postMessage(JSON.stringify({ command: 'chat', param: demo.conversationId }), '*')
        break
      case 'explore':
        setScene(GameFlowSteps.BackToExplore)
        break
      case 'connect':
        window.postMessage('{"command":"connect", "param":"tata"}', '*')
        break
    }
  }

  return (
    <div className={classes.root}>
      {renderDemo && (
        <Grid className={classes.transition} container direction='column' spacing={2}>
          {tpDataBlocks?.map(block => (
            <>
              {renderTouchpoint && (
                <div className={classes.transitionQuick}>
                  {block?.header && (
                    <Grid item xs={12}>
                      <Typography variant='h6' className={classes.preheading}>
                        {block?.preHeader}
                      </Typography>
                      <Typography variant='h2' className={classes.heading}>
                        {block?.header}
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

                  {block.image && (
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
                    ))}
                </div>
              )}
            </>
          ))}
        </Grid>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100% - 105px)',
    width: 'calc(50% - 32px)',
    padding: '0 12.5%',
    top: '105px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 1300,
    color: '#000'
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
    fontSize: '3.125rem',
    lineHeight: '1.2',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      lineHeight: '1.2'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
      lineHeight: '1.2'
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
