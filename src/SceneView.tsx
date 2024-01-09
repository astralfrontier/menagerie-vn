import { useContext } from 'react'
import MomentView from './MomentView'
import { Scene, SceneMomentType } from './scene-engine'
import { GameStateContext } from './state'

interface SceneViewProps {
  scene: Scene
  sceneIndex: number
}

function SceneView(props: SceneViewProps) {
  const gameState = useContext(GameStateContext)

  const { scene, sceneIndex } = props
  const moment = scene[sceneIndex]

  if (moment.momentType == SceneMomentType.JUMP) {
    gameState.jump(moment.destination)
    return <></>
  } else {
    return <MomentView moment={moment} />
  }
}

export default SceneView
