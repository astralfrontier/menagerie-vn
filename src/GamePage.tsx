import { observer } from 'mobx-react'
import { useContext, useState } from 'react'

import SceneView from './SceneView'
import sceneTree from './scene-tree'
import { GameStateContext } from './state'
import SplashView from './SplashView'
import DebugView from './DebugView'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
  DEBUG,
}

function GamePage() {
  const gameState = useContext(GameStateContext)
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.TITLE)

  const currentScene = sceneTree(gameState.sceneIdentifier)

  switch (gameMode) {
    case GameMode.TITLE:
      return (
        <SplashView
          actions={[
            {
              label: 'New Game',
              callback: () => setGameMode(GameMode.SCENES),
            },
            {
              label: 'DEBUG',
              callback: () => setGameMode(GameMode.DEBUG),
            },
          ]}
        />
      )
    case GameMode.SCENES:
      return (
        <SceneView scene={currentScene} sceneIndex={gameState.sceneIndex} />
      )
    case GameMode.DEBUG:
      return <DebugView />
  }
}

export default observer(GamePage)
