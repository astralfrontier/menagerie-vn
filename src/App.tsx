import { createContext } from 'react'
import './App.sass'
import GameView from './GameView'
import { GameState, gameState } from './state'

enum GameMode {
  TITLE, // The title screen
  SCENES, // Playing through game scenes
}

export const GameStateContext = createContext<GameState>(gameState)

function App() {
  return (
    <GameStateContext.Provider value={gameState}>
      <GameView />
    </GameStateContext.Provider>
  )
}

export default App
