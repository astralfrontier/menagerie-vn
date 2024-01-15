import { useState } from 'react'

import SceneView from './SceneView'
import SplashView from './SplashView'
import DebugView from './debug/DebugView'

import SettingsView from './SettingsView'
import classes from './game-page.module.css'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
  SETTINGS, // The settings page
  DEBUG,
}

function GamePage() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.TITLE)

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
          <SceneView />
        </div>
      )
    case GameMode.SETTINGS:
      return <SettingsView />
    case GameMode.DEBUG:
      return <DebugView />
  }
}

export default GamePage
