import { map } from 'ramda'
import { useContext } from 'react'
import { GameStateContext } from './state'

import { SceneChoice, jump } from './scene-engine'

interface ChoiceViewProps {
  choices: SceneChoice[]
}

export default function ChoiceView(props: ChoiceViewProps) {
  const gameState = useContext(GameStateContext)

  const { choices } = props

  return choices.length > 0 ? (
    <div className="box">
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
    </div>
  ) : (
    <></>
  )
}
