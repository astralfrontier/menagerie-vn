import HoodieGirlImage from './assets/wp8198578.webp?url'
import SchoolgirlImage from './assets/anime_girl_PNG88.png?url'
import { SceneSprite, SceneSpritePosition } from './scene-engine'

// This lets the sprite engine return additional arbitrary data about characters
export type NamedSprite = SceneSprite & Record<string, string>

// Right now we don't support moods, there's just one image per character
export default function sprite(
  name: string,
  pose: string = 'default',
  position: SceneSpritePosition
): NamedSprite {
  switch (name) {
    case 'Hoodie Girl':
      return {
        asset: HoodieGirlImage,
        position,
        name,
        pose,
      }
    case 'Schoolgirl':
      return {
        asset: SchoolgirlImage,
        position,
        name,
        pose,
      }
    default:
      throw new Error('Unknown sprite')
  }
}
