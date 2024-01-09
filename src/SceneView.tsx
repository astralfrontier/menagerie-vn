import { observer } from 'mobx-react'
import { useContext } from 'react'
import { GameStateContext } from './App'
import MomentView from './MomentView'
import { Scene, SceneMomentType } from './scene-engine'

interface SceneViewProps {
  scene: Scene
}

function SceneView(props: SceneViewProps) {
  const gameState = useContext(GameStateContext)

  const { scene } = props
  const moment = scene[gameState.sceneIndex]

  if (moment.momentType == SceneMomentType.JUMP) {
    gameState.jump(moment.destination)
  } else {
    return (
      <div>
        <MomentView moment={moment} />
      </div>
    )
  }
}

export default observer(SceneView)
