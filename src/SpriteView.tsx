import { SceneSprite } from './scene-engine'

interface SpriteViewProps {
  sprite: SceneSprite
}

export default function SpriteView(props: SpriteViewProps) {
  const { sprite } = props

  return (
    <figure className="image">{sprite ? <img src={sprite} /> : <></>}</figure>
  )
}
