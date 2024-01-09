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

// Right now we're using the enum values as Bulma CSS classes
export enum SceneTextType {
  DEFAULT = 'is-primary',
  WORRIED = 'is-warning',
  ANGRY = 'is-danger',
}

export interface SceneText {
  message: string
  speaker: string
  position: SceneTextType
}

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
export function sceneContext(
  defaults: Partial<SceneMoment>,
  moments: SceneMoment[]
): SceneMoment[] {
  return map(mergeLeft(defaults), moments)
}

// Return a dialogue moment
export function dialogue(
  message: string,
  speaker: string = '',
  position: SceneTextType = SceneTextType.DEFAULT
): SceneMoment {
  return moment({
    text: [{ message, speaker, position }],
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
  ...sceneContext({ sprites: [HOODIE_GIRL] }, [
    dialogue('Hello there!', 'Hoodie Girl'),
    dialogue('What can I say?', 'Hoodie Girl'),
  ]),
  ...sceneContext({ sprites: [HOODIE_GIRL, ANIME_GIRL] }, [
    dialogue('Now there are two of them!', '', SceneTextType.WORRIED),
  ]),
  ...sceneContext({ sprites: [ANIME_GIRL] }, [
    dialogue('Goodbye hoodie girl', 'Schoolgirl'),
    dialogue('I never liked her anyway', 'Schoolgirl', SceneTextType.ANGRY),
    dialogue('Clicking again will restart the scene'),
  ]),
]
