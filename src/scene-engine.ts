import HoodieGirlImage from './assets/wp8198578.webp?url'
import SchoolgirlImage from './assets/anime_girl_PNG88.png?url'
import { map, mergeLeft } from 'ramda'

export enum SceneMomentType {
  CUSTOM,
  DIALOGUE,
  CHOICE,
  JUMP,
}

// Right now this is a URL
export type SceneBackground = string | undefined

// Right now this is a URL
export type SceneSoundtrack = string | undefined

export enum SceneSpritePosition {
  CHARACTER_LEFT = 'characterLeft',
  CHARACTER_RIGHT = 'characterRight',
}

export interface SceneSprite {
  asset: string
  position: SceneSpritePosition
}

// TODO: add positions later
export type SceneText = string

export interface SceneChoice {
  prompt: string
  destination: string
}

export interface SceneMoment {
  momentType: SceneMomentType
  background: SceneBackground
  soundtrack: SceneSoundtrack
  sprites: SceneSprite[]
  text: SceneText[]
  choices: SceneChoice[]
}

// A scene is just a series of moments
export type Scene = SceneMoment[]

// TODO: dictionary of all registered scenes

/**
 * Return a fully populated moment based on some partial values
 * @param props
 * @returns
 */
export function moment(props: Partial<SceneMoment>): SceneMoment {
  return mergeLeft(props, {
    momentType: SceneMomentType.CUSTOM,
    background: undefined,
    soundtrack: undefined,
    sprites: [],
    text: [],
    choices: [],
  })
}

/**
 * Given a set of default values, merge all the moments with those defaults and return the result
 *
 * @param defaults default values for a scene
 * @param moments a series of moments
 */
export function sceneDefaults(
  defaults: Partial<SceneMoment>,
  moments: SceneMoment[]
): SceneMoment[] {
  return map(mergeLeft(defaults), moments)
}

// Return a dialogue moment
export function dialogue(text: string, sprites?: SceneSprite[]): SceneMoment {
  return moment({
    text: [text],
    sprites,
  })
}

const HOODIE_GIRL: SceneSprite = {
  asset: HoodieGirlImage,
  position: SceneSpritePosition.CHARACTER_LEFT,
}

const ANIME_GIRL: SceneSprite = {
  asset: SchoolgirlImage,
  position: SceneSpritePosition.CHARACTER_RIGHT,
}

export const defaultScene: Scene = [
  dialogue('Hello There!', [HOODIE_GIRL]),
  dialogue('More of the same', [HOODIE_GIRL]),
  dialogue('Now there are two of them!', [HOODIE_GIRL, ANIME_GIRL]),
  dialogue('Clicking for more dialogue will restart the scene', [ANIME_GIRL]),
]
