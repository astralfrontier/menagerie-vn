import HoodieGirlImage from './assets/wp8198578.webp?url'
import SchoolgirlImage from './assets/anime_girl_PNG88.png?url'
import AnimeSchoolBackground from './assets/147385-download-free-anime-school-background-2560x1440.jpg'

export enum GameAssetType {
  IMAGE,
  // TODO: video files, soundtrack...
}

export interface GameAsset {
  assetType: GameAssetType
  url: string
}

// Characters are labeled "character/pose", with "default" being the fallback pose
const assets: Record<string, GameAsset> = {
  HoodieGirlDefault: {
    assetType: GameAssetType.IMAGE,
    url: HoodieGirlImage,
  },
  SchoolgirlDefault: {
    assetType: GameAssetType.IMAGE,
    url: SchoolgirlImage,
  },
  SchoolClassroomBackground: {
    assetType: GameAssetType.IMAGE,
    url: AnimeSchoolBackground,
  },
}

// Return the URL for a given asset
export default function asset(label: string): string {
  if (assets[label]) {
    return assets[label].url
  }
  throw new Error('Asset not found')
}
