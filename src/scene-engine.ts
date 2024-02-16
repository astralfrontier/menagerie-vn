import { concat, defaultTo, map, mergeLeft, reduce } from 'ramda'
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

// A scene is just a series of moments
export type Scene = SceneMoment[]

export type SceneTree = Record<SceneIdentifier, Scene>

// Given a set of scenes, enforce some default property values, e.g. soundtrack or background
export function sceneContext(
  defaults: Partial<SceneMoment>,
  moments: SceneMoment[]
): SceneMoment[] {
  return map(mergeLeft(defaults), moments)
}

export function dialogue(
  message: string,
  speaker: DataSprite | undefined = undefined,
  position: SceneTextType = SceneTextType.DEFAULT
): SceneMoment {
  return moment({
    sprites: speaker ? [speaker] : [],
    text: [
      {
        message: message.replaceAll('|', '  \n'),
        speaker,
        position,
      },
    ],
  })
}

export function choice(message: string, choices: SceneChoice[]): SceneMoment {
  return moment({
    momentType: SceneMomentType.CHOICE,
    text: [
      {
        message: message.replaceAll('|', '  \n'),
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
