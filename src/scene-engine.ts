import { map, mergeLeft } from 'ramda'

export enum SceneMomentType {
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

export type SceneIdentifier = string

export interface SceneChoice {
  label: string
  destination: SceneIdentifier
}

export interface SceneMoment {
  momentType: SceneMomentType
  background: SceneBackground
  soundtrack: SceneSoundtrack
  sprites: SceneSprite[]
  text: SceneText[]
  choices: SceneChoice[]
  destination: SceneIdentifier
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
    momentType: SceneMomentType.DIALOGUE,
    background: undefined,
    soundtrack: undefined,
    sprites: [],
    text: [],
    choices: [],
    destination: '',
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

export function choice(message: string, choices: SceneChoice[]): SceneMoment {
  return moment({
    momentType: SceneMomentType.CHOICE,
    text: [{ message, speaker: '', position: SceneTextType.DEFAULT }],
    choices,
  })
}

export function jump(destination: SceneIdentifier): SceneMoment {
  return moment({
    momentType: SceneMomentType.JUMP,
    destination,
  })
}
