import './App.sass'
import GameView from './GameView'
import { GameStateContext, gameState } from './state'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
}

function App() {
  return (
    <GameStateContext.Provider value={gameState}>
      <GameView />
    </GameStateContext.Provider>
  )
}

export default App
