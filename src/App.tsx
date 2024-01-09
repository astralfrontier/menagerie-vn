import { useState } from 'react'
import './App.sass'
import SceneView from './SceneView'
import { SceneIdentifier } from './scene-engine'

import sceneTree from './scene-tree'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
}

function App() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.TITLE)
  const [sceneIdentifier, setSceneIdentifier] =
    useState<SceneIdentifier>('default')

  const defaultScene = sceneTree(sceneIdentifier)

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
          <SceneView
            scene={defaultScene}
            setSceneIdentifier={setSceneIdentifier}
          />
        </div>
      )
  }
}

export default App
