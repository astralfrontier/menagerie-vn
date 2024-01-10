import { observer } from 'mobx-react'
import { useContext, useState } from 'react'

import SceneView from './SceneView'
import sceneTree from './scene-tree'
import { GameStateContext } from './state'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
}

function GameView() {
  const gameState = useContext(GameStateContext)
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.TITLE)

  const currentScene = sceneTree(gameState.sceneIdentifier)

  switch (gameMode) {
    case GameMode.TITLE:
      return (
        <div className="container">
          <h1 className="title">Menagerie VN Demo</h1>
          <a
            className="button is-primary"
            onClick={() => setGameMode(GameMode.SCENES)}
          >
            Start Playing
          </a>
        </div>
      )
    case GameMode.SCENES:
      return (
        <SceneView scene={currentScene} sceneIndex={gameState.sceneIndex} />
      )
  }
}

export default observer(GameView)
