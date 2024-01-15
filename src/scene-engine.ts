import { concat, map, mergeLeft, reduce } from 'ramda'
import { GameState, WorldState } from './state'

export enum SceneMomentType {
  DIALOGUE = 'DIALOGUE',
  CHOICE = 'CHOICE',
  JUMP = 'JUMP',
}

// Right now this is a URL
export type SceneBackground = string | undefined

// Right now this is a URL
export type SceneSoundtrack = string | undefined

export enum SceneSpritePosition {
  CHARACTER_LEFT = 'CHARACTER_LEFT',
  CHARACTER_RIGHT = 'CHARACTER_RIGHT',
}

export interface SceneSprite {
  asset: string
  position: SceneSpritePosition
}

export type DataSprite = SceneSprite & Record<string, any>

// TODO: implement later on, once we have different types of speech bubbles
export enum SceneTextType {
  DEFAULT = 'DEFAULT',
}

export interface SceneText {
  message: string
  speaker: DataSprite | undefined
  position: SceneTextType
}

export type SceneIdentifier = string

export interface SceneChoice {
  label: string
  destination: SceneIdentifier
}

export type SceneScript = (
  self: SceneMoment,
  gameState: GameState,
  worldState: WorldState
) => SceneMoment

export interface SceneMoment {
  momentType: SceneMomentType
  background: SceneBackground
  soundtrack: SceneSoundtrack
  sprites: SceneSprite[]
  text: SceneText[]
  choices: SceneChoice[]
  destination: SceneIdentifier
  script: SceneScript | undefined
}

// A scene is just a series of moments
export type Scene = SceneMoment[]

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
    script: undefined,
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
  message: string[],
  speaker: DataSprite | undefined = undefined,
  position: SceneTextType = SceneTextType.DEFAULT
): SceneMoment {
  return moment({
    text: [{ message: message.join('  \n'), speaker, position }],
  })
}

// Given multiple moments, concatenate their text blocks together
// and return the first moment with modified text
export function exchange(moments: SceneMoment[]): SceneMoment {
  const firstMoment = moments[0]
  const text = reduce(
    (text, moment) => concat(text, moment.text),
    [] as SceneText[],
    moments
  )
  return {
    ...firstMoment,
    text,
  }
}

export function choice(message: string[], choices: SceneChoice[]): SceneMoment {
  return moment({
    momentType: SceneMomentType.CHOICE,
    text: [
      {
        message: message.join('  \n'),
        speaker: undefined,
        position: SceneTextType.DEFAULT,
      },
    ],
    choices,
  })
}

export function jump(destination: SceneIdentifier): SceneMoment {
  return moment({
    momentType: SceneMomentType.JUMP,
    destination,
  })
}
