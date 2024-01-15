import './App.sass'
import GamePage from './GamePage'
import {
  GameStateContext,
  gameState,
  WorldStateContext,
  worldState,
} from './state'

function App() {
  return (
    <GameStateContext.Provider value={gameState}>
      <WorldStateContext.Provider value={worldState}>
        <GamePage />
      </WorldStateContext.Provider>
    </GameStateContext.Provider>
  )
}

export default App
