import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Box, Button, Grid, makeStyles, Typography, Theme } from '@material-ui/core'
import { Video } from 'components/shared'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { GameFlowStepsConfig } from 'helpers/steps'
import { GameFlowSteps } from 'types'

export const EventRelay = () => {
  const classes = useStyles({})
  const [renderDemo, setRenderDemo] = useState<boolean>(false)
  const videoUrl = 'https://d1oc551tl862q5.cloudfront.net/5GCoverage720.mp4'
  const nextVideoUrlThumb = '/static/media/mec-thumbnail.604310e8.png'

  useEffect(() => {
    setTimeout(() => {
      setRenderDemo(true)
    }, GameFlowStepsConfig[GameFlowSteps.Demo].animation.time)
  }, [])

  return (
    <div className={classes.root}>
      {renderDemo && (
        <Grid className={classes.mainContainer} container direction='row'>
          <Grid item sm={12} md={7} lg={9} className={classes.demoContainer}>
            <Video videoSrc={videoUrl} />
            <Box display='flex' className={classes.contentActionBox}>
              <Button startIcon={<ArrowBackIcon />}>Back</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={3} className={classes.endContainer} container direction={'column'}>
            <Grid item xs={6} className={classes.endContentContainer} container alignItems='flex-start' direction='row'>
              <Grid item xs={12}>
                <Typography variant='h1' className={classes.header}>
                  Headline
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component='p' className={classes.body} paragraph>
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or
                  web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to
                  have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              xs={6}
              className={cn(classes.endContentContainer, classes.borderTop)}
              container
              alignItems='flex-end'
              direction='row'
            >
              <Grid xs={12} container direction={'row'} alignItems='flex-end'>
                <Grid item xs={6}>
                  <Typography variant='h1' className={classes.subHeader}>
                    Next Video
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={12}>
                <Box flexGrow={1}>
                  <figure className={classes.thumbnail}>
                    <img src={nextVideoUrlThumb} alt='Video thumbnail' />
                  </figure>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
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
    overflowY: 'auto',
    [`${theme.breakpoints.down('md')}, screen and (max-height: 760px)`]: {
      display: 'block',
      height: 'calc(100vh - 65px)',
      top: 65,
      width: '100vw'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      display: 'block',
      height: 'calc(100vh - 65px)',
      top: 65,
      width: '100vw'
    }
  },
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
  contentActionBox: {
    marginTop: 27,

    '& .MuiButton-root': {
      marginRight: theme.spacing(4),
      marginTop: 0,
      marginBottom: 0
    }
  },
  endContainer: {
    padding: '4rem 5rem 6rem 0rem',
    justifyContent: 'center',
    minHeight: '100%',
    [theme.breakpoints.down('lg')]: {
      paddingRight: '4rem'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      display: 'block',
      fontSize: '.9em',
      justifyContent: 'flex-start',
      padding: '3rem 8rem 0 3rem'
    },
    [theme.breakpoints.only('xs')]: {
      padding: '0 2rem'
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: 'calc(6rem + 60px)'
    }
  },
  borderTop: {
    borderTop: '1px solid #DBDBDB'
  },
  endContentContainer: {
    maxWidth: '100%',
    minHeight: '50%',
    '& .MuiGrid-item': {
      padding: '5px 0'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      minHeight: 'unset'
    }
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
  body: {
    [theme.breakpoints.only('md')]: {
      fontSize: '16px !important'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px !important'
    }
  },
  subHeader: {
    fontSize: '20px',
    lineHeight: '1.2',
    fontWeight: 700
  },
  thumbnail: {
    cursor: 'pointer',
    position: 'relative',

    '& > img': {
      width: '100%'
    },

    '& > figcaption': {
      bottom: 0,
      color: theme.palette.common.white,
      padding: theme.spacing(2),
      position: 'absolute',
      textShadow: `1px 1px 2px ${theme.palette.common.black}`
    }
  },
  mainContainer: {
    maxWidth: 1530,
    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.75s'
  },
  demoContainer: {
    padding: '4rem 5rem 6rem 5rem',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      paddingRight: '4rem',
      paddingLeft: '4rem'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      padding: ' 3rem 6rem 0 3rem'
    },
    [theme.breakpoints.only('xs')]: {
      padding: '0 2rem'
    }
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
