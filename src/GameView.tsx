import { observer } from 'mobx-react'
import { useContext, useState } from 'react'
import { GameStateContext } from './App'
import SceneView from './SceneView'
import sceneTree from './scene-tree'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
}

function GameView() {
  const gameState = useContext(GameStateContext)
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.TITLE)

  const defaultScene = sceneTree(gameState.sceneIdentifier)

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
        <div className="container">
          <SceneView scene={defaultScene} />
        </div>
      )
  }
}

export default observer(GameView)
