import HoodieGirlImage from './assets/wp8198578.webp?url'
import SchoolgirlImage from './assets/anime_girl_PNG88.png?url'
import { SceneSprite, SceneSpritePosition } from './scene-engine'

export type NamedSprite = SceneSprite & Record<string, string>

const HOODIE_GIRL: NamedSprite = {
  asset: HoodieGirlImage,
  position: SceneSpritePosition.CHARACTER_LEFT,
  name: 'Hoodie Girl',
}

const SCHOOLGIRL: NamedSprite = {
  asset: SchoolgirlImage,
  position: SceneSpritePosition.CHARACTER_RIGHT,
  name: 'Schoolgirl',
}

// Right now we don't support moods, there's just one image per character
export default function sprite(name: string, _mood: string): NamedSprite {
  switch (name) {
    case 'Hoodie Girl':
      return HOODIE_GIRL
    case 'Schoolgirl':
      return SCHOOLGIRL
    default:
      throw new Error('Unknown sprite')
  }
}
