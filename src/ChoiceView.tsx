import { map } from 'ramda'
import { SceneChoice, SceneIdentifier } from './scene-engine'

interface ChoiceViewProps {
  choices: SceneChoice[]
  jump: (destination: SceneIdentifier) => void
  advance: () => void
}

export default function ChoiceView(props: ChoiceViewProps) {
  const { choices, jump, advance } = props

  return choices.length > 0 ? (
    <aside className="menu">
      <ul className="menu-list">
        {map(
          (choice) => (
            <li>
              <a onClick={() => jump(choice.destination)}>{choice.label}</a>
            </li>
          ),
          choices
        )}
      </ul>
    </aside>
  ) : (
    <a className="button is-primary" onClick={() => advance()}>
      Next
    </a>
  )
}
