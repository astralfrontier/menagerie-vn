import { useState } from 'react'
import { Scene, SceneIdentifier, SceneMomentType } from './scene-engine'
import MomentView from './MomentView'

interface SceneViewProps {
  scene: Scene
  setSceneIdentifier: React.Dispatch<React.SetStateAction<string>>
}

export default function SceneView(props: SceneViewProps) {
  const { scene, setSceneIdentifier } = props

  const [sceneIndex, setSceneIndex] = useState<number>(0)

  function jump(destination: SceneIdentifier) {
    setSceneIdentifier(destination)
    setSceneIndex(0)
  }

  function advance() {
    let nextIndex = sceneIndex + 1
    if (nextIndex == scene.length) {
      nextIndex = 0
    }
    setSceneIndex(nextIndex)
  }

  const moment = scene[sceneIndex]

  if (moment.momentType == SceneMomentType.JUMP) {
    jump(moment.destination)
  } else {
    return (
      <div>
        <MomentView moment={moment} jump={jump} advance={advance} />
      </div>
    )
  }
}
