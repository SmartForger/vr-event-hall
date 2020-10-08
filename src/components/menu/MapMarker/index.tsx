import React from 'react'
import classnames from 'classnames'

import { StyledMapMarker } from './Styled'

import { ITeleportLocation, IMapLocation } from 'types'

export type MapMarkerProps = {
  // onFinished: (scene: Scene) => void,
  teleportLocations: ITeleportLocation[]
  mapLocation: IMapLocation
}

export const MapMarker = (props: MapMarkerProps) => {
  function goto3Dlocation(location) {
    if (props.mapLocation.babylonParam === location) return

    const instance = BABYLON['SceneManager'].GetInstance()
    const gobjScene = instance.getScene().getNodeByName('Scene')
    const scriptMain = instance.findSceneComponent('PROJECT.VX360SceneController', gobjScene)

    scriptMain.teleport(location)
  }

  return (
    <StyledMapMarker>
      <ul>
        {props.teleportLocations.map(item => {
          return (
            <li
              className={classnames({
                'active-location': item.babylonParam === props.mapLocation.babylonParam
              })}
              key={item.babylonParam}
              onClick={() => {
                goto3Dlocation(item.babylonParam)
              }}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    </StyledMapMarker>
  )
}
