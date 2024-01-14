import { observer } from 'mobx-react'
import { useContext, useState } from 'react'

import SceneView from './SceneView'
import sceneTree from './scene-tree'
import { GameStateContext } from './state'
import SplashView from './SplashView'
import DebugView from './debug/DebugView'

import classes from './game-page.module.css'
import SettingsView from './SettingsView'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
  SETTINGS, // The settings page
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
              label: 'Settings',
              callback: () => setGameMode(GameMode.SETTINGS),
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
        <div className={classes.unselectable}>
          <SceneView scene={currentScene} sceneIndex={gameState.sceneIndex} />
        </div>
      )
    case GameMode.SETTINGS:
      return <SettingsView />
    case GameMode.DEBUG:
      return <DebugView />
  }
}

export default observer(GamePage)
