import './App.sass'
import GamePage from './GamePage'
import { GameStateContext, gameState } from './state'

function App() {
  return (
    <GameStateContext.Provider value={gameState}>
      <GamePage />
    </GameStateContext.Provider>
  )
}

export default App
