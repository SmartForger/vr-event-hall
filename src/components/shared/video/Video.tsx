import React, { FC, useEffect, useState } from 'react'
import { ControlBar, Player, BigPlayButton } from 'video-react'
import { makeStyles } from '@material-ui/core'

interface IVideoProps {
  checkVideoTime?: (player: any) => void
  onEnded?: () => void
  posterSrc?: string
  videoSrc: string
  trackSrc?: string
  autoPlay?: boolean
  disableControls?: boolean
  autoLoop?: boolean
}

export const Video: FC<IVideoProps> = ({
  checkVideoTime,
  posterSrc,
  videoSrc,
  trackSrc,
  autoPlay,
  disableControls,
  autoLoop,
  onEnded
}) => {
  const classes = useStyles()
  const [videoPlayer, setVideoPlayer] = useState<{
    video: { video: HTMLVideoElement | undefined }
  }>()
  const [videoAccessible, setVideoAccessible] = useState<boolean>(true)

  const onEndedFunc = () => {
    if (onEnded) {
      onEnded()
    }
  }

  useEffect(() => {
    if (videoPlayer && videoPlayer.video && videoPlayer.video.video) {
      videoPlayer.video.video.oncontextmenu = e => e.preventDefault()
    }
  }, [videoPlayer])

  useEffect(() => {
    if (checkVideoTime && videoPlayer) {
      checkVideoTime(videoPlayer)
    }
  }, [videoPlayer])

  return (
    <>
      {/* If the video file could not be found, we display the image in place of the video player w/ poster */}
      {!videoAccessible ? (
        <img src={posterSrc} alt='Video Placeholder Image' className={classes.vidPlaceholderImg} />
      ) : (
        <Player
          playsInline
          ref={player => {
            setVideoPlayer(player)
          }}
          fluid={true}
          preload='auto'
          seekable='false'
          src={videoSrc}
          poster={posterSrc}
          loop={autoLoop}
          autoPlay={autoPlay || false}
          onEnded={() => onEndedFunc()}
          onError={(e: any) => setVideoAccessible(false)}
        >
          <BigPlayButton position='center' />
          <ControlBar disableCompletely={disableControls} />
        </Player>
      )}
    </>
  )
}

const useStyles = makeStyles({
  videoSrcAccessibilityCheckerElem: {
    display: 'none'
  },
  vidPlaceholderImg: {
    width: '100%'
  }
})
