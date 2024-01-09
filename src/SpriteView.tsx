import { SceneSprite } from './scene-engine'

import classes from './sprite-view.module.css'

interface SpriteViewProps {
  sprite: SceneSprite
}

export default function SpriteView(props: SpriteViewProps) {
  const { sprite } = props

  return (
    <figure className="image">
      {sprite ? <img src={sprite} className={classes.sprite} /> : <></>}
    </figure>
  )
}
