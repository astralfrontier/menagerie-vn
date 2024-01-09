import HoodieGirlImage from './assets/wp8198578.webp?url'
import SchoolgirlImage from './assets/anime_girl_PNG88.png?url'
import { SceneSprite, SceneSpritePosition } from './scene-engine'

export type NamedSprite = SceneSprite & Record<string, string>

export const HOODIE_GIRL: NamedSprite = {
  asset: HoodieGirlImage,
  position: SceneSpritePosition.CHARACTER_LEFT,
  name: 'Hoodie Girl',
}

export const SCHOOLGIRL: NamedSprite = {
  asset: SchoolgirlImage,
  position: SceneSpritePosition.CHARACTER_RIGHT,
  name: 'Schoolgirl',
}

// TODO: support for moods
