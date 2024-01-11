import './App.sass'
import GamePage from './GamePage'
import { GameStateContext, gameState } from './state'

function App() {
  return (
    <GameStateContext.Provider value={gameState}>
      <div className="unselectable">
        <GamePage />
      </div>
    </GameStateContext.Provider>
  )
}

export default App
