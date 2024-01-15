import { map } from 'ramda'
import { useContext } from 'react'
import { GameStateContext } from './state'

import { SceneChoice } from './scene-engine'

import classes from './choice-view.module.css'

interface ChoiceViewProps {
  choices: SceneChoice[]
}

export default function ChoiceView(props: ChoiceViewProps) {
  const gameState = useContext(GameStateContext)

  const { choices } = props

  return choices.length > 0 ? (
    <div className="modal is-active">
      <div className="modal-content">
        <div className={`box ${classes.choicebox}`}>
          {map(
            (choice) => (
              <div className="m-2" key={choice.destination}>
                <a
                  className={`button is-link ${classes.choice}`}
                  onClick={() => gameState.jump(choice.destination)}
                >
                  {choice.label}
                </a>
              </div>
            ),
            choices
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
