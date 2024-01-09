import './App.sass'
import SceneView from './SceneView'

import { defaultScene } from './scene-engine'

function App() {
  return (
    <div className="container">
      <SceneView scene={defaultScene} />
    </div>
  )
}

export default App
