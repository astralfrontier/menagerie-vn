import {
  SceneIdentifier,
  SceneMoment,
  SceneSprite,
  SceneSpritePosition,
} from './scene-engine'
import SpriteView from './SpriteView'
import { find } from 'ramda'
import TextView from './TextView'
import ChoiceView from './ChoiceView'

interface MomentViewProps {
  moment: SceneMoment
  jump: (destination: SceneIdentifier) => void
  advance: () => void
}

// Return the first sprite found in a given position
function spritesOnSide(
  moment: SceneMoment,
  position: SceneSpritePosition
): SceneSprite | undefined {
  return find((sprite) => sprite.position == position, moment.sprites)
}

// TODO: delegate to a subcomponent based on moment type
export default function MomentView(props: MomentViewProps) {
  const { moment, jump, advance } = props

  const spriteLeft = spritesOnSide(moment, SceneSpritePosition.CHARACTER_LEFT)
  const spriteRight = spritesOnSide(moment, SceneSpritePosition.CHARACTER_RIGHT)

  return (
    <div className="columns">
      <div className="column is-4">
        <SpriteView sprite={spriteLeft} />
      </div>
      <div className="column is-4">
        <TextView text={moment.text} />
        <ChoiceView choices={moment.choices} jump={jump} advance={advance} />
      </div>
      <div className="column is-4">
        <SpriteView sprite={spriteRight} />
      </div>
    </div>
  )
}
