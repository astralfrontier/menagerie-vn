import { SceneSprite } from './scene-engine'

import classes from './sprite-view.module.css'

interface SpriteViewProps {
  sprite: SceneSprite | undefined
}

export default function SpriteView(props: SpriteViewProps) {
  const { sprite } = props

  return sprite ? (
    <figure className="image">
      {sprite ? <img src={sprite.asset} className={classes.sprite} /> : <></>}
    </figure>
  ) : (
    <></>
  )
}
