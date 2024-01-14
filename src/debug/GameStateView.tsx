import { useContext } from 'react'
import { GameStateContext } from '../state'

export default function GameStateView() {
  const gameState = useContext(GameStateContext)

  return (
    <div className="container">
      <pre>{JSON.stringify(gameState, null, 2)}</pre>
    </div>
  )
}
