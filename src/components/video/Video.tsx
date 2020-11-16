import React, { useEffect, useState } from 'react'
import { Player, BigPlayButton } from 'video-react'
import { Modal } from '../modal'

export const Video = ({ visible, setVisibility, videoSrc, trackSrc }) => {
  const [videoPlayer, setVideoPlayer] = useState<{
    video: { video: HTMLVideoElement | undefined }
  }>()

  useEffect(() => {
    if (videoPlayer && videoPlayer.video && videoPlayer.video.video) {
      videoPlayer.video.video.oncontextmenu = e => e.preventDefault()
      videoPlayer.video.video.volume = 0.5
    }
  }, [videoPlayer])

  return (
    <Modal open={visible} onClose={() => setVisibility(false)}>
      <Player
        ref={player => {
          setVideoPlayer(player)
        }}
        playsInline
        // poster={Poster} // TODO: add poster
        preload='auto'
        seekable='false'
        fluid={true}
        width='auto'
        height='100%'
        src={videoSrc}
      >
        <BigPlayButton position='center' />
        {trackSrc ? (
          <track id='track1' kind='captions' srcLang='en' src={require(`assets/${trackSrc}`)} label='English' />
        ) : null}
      </Player>
    </Modal>
  )
}
