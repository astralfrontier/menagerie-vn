import { useContext } from 'react'
import { GameStateContext } from './state'

interface SettingsViewProps {}

function SettingsView(props: SettingsViewProps) {
  const gameState = useContext(GameStateContext)

  return (
    <div className="container">
      <p>TODO implement</p>
    </div>
  )
}

export default SettingsView
