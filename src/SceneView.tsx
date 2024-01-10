import { useContext } from 'react'
import MomentView from './MomentView'
import { Scene, SceneMomentType } from './scene-engine'
import { GameStateContext } from './state'

import classes from './scene-view.module.css'

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
    return (
      <div className={classes.scene}>
        <MomentView moment={moment} />
      </div>
    )
  }
}

export default SceneView
