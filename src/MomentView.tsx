import { find } from 'ramda'
import ChoiceView from './ChoiceView'
import SpriteView from './SpriteView'
import TextView from './TextView'
import { SceneMoment, SceneSprite, SceneSpritePosition } from './scene-engine'

import classes from './moment-view.module.css'

interface MomentViewProps {
  moment: SceneMoment
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
  const { moment } = props

  const spriteLeft = spritesOnSide(moment, SceneSpritePosition.CHARACTER_LEFT)
  const spriteRight = spritesOnSide(moment, SceneSpritePosition.CHARACTER_RIGHT)

  const style = moment.background
    ? { backgroundImage: `url(${moment.background})` }
    : {}

  return (
    <div
      className={`columns is-gapless ${classes.backgroundImage}`}
      style={style}
    >
      <div className={`column is-4 ${classes.spriteContainer}`}>
        <div className={classes.spriteWrapper}>
          <SpriteView sprite={spriteLeft} />
        </div>
      </div>
      <div className="column is-4">
        <div className="box">
          <TextView text={moment.text} />
          <ChoiceView choices={moment.choices} />
        </div>
      </div>
      <div className={`column is-4 ${classes.spriteContainer}`}>
        <div className={classes.spriteWrapper}>
          <SpriteView sprite={spriteRight} />
        </div>
      </div>
    </div>
  )
}
