import { map } from 'ramda'
import { useContext } from 'react'
import { GameStateContext } from './App'
import { SceneChoice, jump } from './scene-engine'

interface ChoiceViewProps {
  choices: SceneChoice[]
}

export default function ChoiceView(props: ChoiceViewProps) {
  const gameState = useContext(GameStateContext)

  const { choices } = props

  return choices.length > 0 ? (
    <aside className="menu">
      <ul className="menu-list">
        {map(
          (choice) => (
            <li key={choice.destination}>
              <a onClick={() => gameState.jump(choice.destination)}>
                {choice.label}
              </a>
            </li>
          ),
          choices
        )}
      </ul>
    </aside>
  ) : (
    <a className="button is-primary" onClick={() => gameState.advance()}>
      Next
    </a>
  )
}
