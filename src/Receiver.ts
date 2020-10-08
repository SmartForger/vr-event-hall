import { toast } from 'react-toastify'

export default class Receiver {
  static init(onSceneSetup: () => void, setmodalConfig, setShowModal, setMapLocation, teleportLocations) {
    window.addEventListener(
      'message',
      e => {
        try {
          var JSONdata = JSON!.parse(e.data)
          const assetRoot = 'https://vx360useravatar230132-dev.s3.amazonaws.com/media/'
          switch (JSONdata!.command) {
            case 'initialised':
              if (!!onSceneSetup) {
                onSceneSetup()
              }
              break
            case 'vod':
              switch (JSONdata!.param) {
                case 'concert-1':
                  setmodalConfig({ videoSrc: `${assetRoot}concert.mp4` })
                  break
                case 'concert-2':
                  setmodalConfig({ videoSrc: `${assetRoot}message-board.mp4` })
                  break
                case 'lounge-3':
                case 'lounge-4':
                case 'lounge-5':
                  setmodalConfig({ videoSrc: `${assetRoot}work.mp4` })
                  break
                case 'gallery-1':
                  setmodalConfig({ videoSrc: `${assetRoot}finance.mp4` })
                  break
                case 'gallery-2':
                  setmodalConfig({ videoSrc: `${assetRoot}trolli.mp4` })
                  break
                case 'gallery-3':
                  setmodalConfig({ videoSrc: `${assetRoot}schwans.mp4` })
                  break
                case 'gallery-4':
                  setmodalConfig({ videoSrc: `${assetRoot}netflix.mp4` })
                  break
                case 'roundtable-3':
                  setmodalConfig({ videoSrc: `${assetRoot}poll.mp4` })
                  break
                default:
                  setmodalConfig({ videoSrc: `${assetRoot}work.mp4` })
                  break
              }
              setShowModal(true)
              break
            case 'stream':
              setmodalConfig({ streamSrc: '21X5lGlDOfg' })
              setShowModal(true)
              toast.info(
                'The Future of Live Events livestream is currently unavailable. Please enjoy this NASA livestream instead',
                { autoClose: 10000, toastId: 'livestream' }
              )
              break
            case 'location':
              const currentLocation = teleportLocations.find(x => x.babylonParam === JSONdata.param1)
              setMapLocation(currentLocation)
              break
            case 'game':
              setmodalConfig({ imgSource: `${assetRoot}arcade.png` })
              setShowModal(true)
              break
            case 'ar':
              toast.info('Demo Coming Soon!', {
                autoClose: 5000,
                toastId: 'ar-demo'
              })
              break
            default:
              return
          }
        } catch (e) {
          // handle error?
        }
      },
      false
    )
  }
}
