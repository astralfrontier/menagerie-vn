import { DataSprite, SceneSpritePosition } from './scene-engine'
import asset from './asset-engine'

// Right now we don't support moods, there's just one image per character
export default function sprite(
  name: string,
  pose: string = 'default',
  position: SceneSpritePosition
): DataSprite {
  switch (name) {
    case 'Hoodie Girl':
      return {
        asset: asset('HoodieGirlDefault'),
        position,
        name,
        pose,
      }
    case 'Schoolgirl':
      return {
        asset: asset('SchoolgirlDefault'),
        position,
        name,
        pose,
      }
    default:
      throw new Error('Unknown sprite')
  }
}
