import { Scene, Engine, Observer, Nullable } from 'babylonjs'
import React, { useEffect } from 'react'

export const FPS = (props: any) => {
  useEffect(() => {
    let scene: Scene
    let observer: Nullable<Observer<Scene>>

    if (Object.keys(props).length > 0) {
      scene = props

      let engine = props._engine as Engine

      observer = props.onAfterRenderObservable.add(() => {
        const elFPS = document.getElementById('fps')

        let FPS = engine.getFps().toFixed()

        if (!!elFPS) {
          elFPS.innerText = FPS + ' fps'
        }
      })
    }

    return () => {
      if (!!scene) {
        scene.onAfterRenderObservable.remove(observer)
      }
    }
  })

  return <div id='fps' />
}
