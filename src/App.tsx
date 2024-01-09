import { useState } from 'react'
import './App.sass'
import SceneView from './SceneView'
import { SceneIdentifier } from './scene-engine'

import sceneTree from './scene-tree'

function App() {
  const [sceneIdentifier, setSceneIdentifier] =
    useState<SceneIdentifier>('default')

  const defaultScene = sceneTree[sceneIdentifier]
  return (
    <div className="container">
      <SceneView scene={defaultScene} setSceneIdentifier={setSceneIdentifier} />
    </div>
  )
}

export default App
