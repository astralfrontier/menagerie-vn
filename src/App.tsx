import './App.sass'
import GamePage from './GamePage'
import { GameStateContext, gameState } from './state'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
}

function App() {
  return (
    <GameStateContext.Provider value={gameState}>
      <GamePage />
    </GameStateContext.Provider>
  )
}

export default App
