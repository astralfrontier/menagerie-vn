import { useState } from 'react'
import { Scene, SceneMomentType } from './scene-engine'
import MomentView from './MomentView'

interface SceneViewProps {
  scene: Scene
  setSceneIdentifier: React.Dispatch<React.SetStateAction<string>>
}

export default function SceneView(props: SceneViewProps) {
  const { scene, setSceneIdentifier } = props

  const [sceneIndex, setSceneIndex] = useState<number>(0)

  // If the scene overflows, restart as a final emergency
  if (sceneIndex >= scene.length) {
    setSceneIndex(0)
  } else {
    const moment = scene[sceneIndex]

    if (moment.momentType == SceneMomentType.JUMP) {
      setSceneIndex(0)
      setSceneIdentifier(moment.destination)
    } else {
      return (
        <div onClick={() => setSceneIndex(sceneIndex + 1)}>
          <MomentView moment={moment} />
        </div>
      )
    }
  }
}
