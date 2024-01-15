import { useContext } from 'react'
import MomentView from './MomentView'
import { SceneMomentType } from './scene-engine'
import { GameStateContext, WorldStateContext } from './state'

import classes from './scene-view.module.css'
import sceneTree from './scene-tree'
import { observer } from 'mobx-react'

function SceneView() {
  const gameState = useContext(GameStateContext)
  const worldState = useContext(WorldStateContext)
  const currentScene = sceneTree(gameState.sceneIdentifier)
  let moment = currentScene[gameState.sceneIndex]

  if (moment.script) {
    moment = moment.script(moment, gameState, worldState)
  }

  if (moment.momentType == SceneMomentType.JUMP) {
    gameState.jump(moment.destination)
    return <></>
  } else if (moment.momentType == SceneMomentType.CHOICE) {
    return (
      <div className={classes.scene}>
        <MomentView moment={moment} />
      </div>
    )
  } else {
    return (
      <div className={classes.scene} onClick={() => gameState.advance()}>
        <MomentView moment={moment} />
      </div>
    )
  }
}

export default observer(SceneView)
