import { useState } from 'react'
import { Scene } from './scene-engine'
import MomentView from './MomentView'

interface SceneViewProps {
  scene: Scene
}

export default function SceneView(props: SceneViewProps) {
  const { scene } = props

  const [sceneIndex, setSceneIndex] = useState<number>(0)

  if (sceneIndex >= scene.length) {
    setSceneIndex(0)
  } else {
    const moment = scene[sceneIndex]

    return (
      <div onClick={() => setSceneIndex(sceneIndex + 1)}>
        <MomentView moment={moment} />
      </div>
    )
  }
}
