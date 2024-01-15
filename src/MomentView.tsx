import { map } from 'ramda'
import ChoiceView from './ChoiceView'
import SpriteView from './SpriteView'
import TextView from './TextView'
import { SceneMoment, SceneSpritePosition } from './scene-engine'

import classes from './moment-view.module.css'

interface MomentViewProps {
  moment: SceneMoment
}

export default function MomentView(props: MomentViewProps) {
  const { moment } = props

  const style = moment.background
    ? { backgroundImage: `url(${moment.background})` }
    : {}

  return (
    <div className={classes.backgroundImage} style={style}>
      {map((sprite) => {
        let characteralignment = ''
        switch (sprite.position) {
          case SceneSpritePosition.CHARACTER_LEFT:
            characteralignment = 'characterleft'
            break
          case SceneSpritePosition.CHARACTER_RIGHT:
            characteralignment = 'characterright'
            break
        }
        return (
          <div
            className={`${classes.character} ${classes[characteralignment]}`}
          >
            <SpriteView sprite={sprite} />
          </div>
        )
      }, moment.sprites)}
      <div className={classes.text}>
        <div className={classes.centered}>
          <TextView text={moment.text} />
        </div>
        <ChoiceView choices={moment.choices} />
      </div>
    </div>
  )
}
