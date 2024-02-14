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

export class SceneMoment {
  momentType: SceneMomentType
  background: SceneBackground
  soundtrack: SceneSoundtrack
  sprites: SceneSprite[]
  text: SceneText[]
  choices: SceneChoice[]
  destination: SceneIdentifier
  script: SceneScript | undefined

  constructor(props: Partial<SceneMoment> = {}) {
    this.momentType = defaultTo(SceneMomentType.DIALOGUE, props.momentType)
    this.background = props.background
    this.soundtrack = props.soundtrack
    this.sprites = defaultTo([], props.sprites)
    this.text = defaultTo([], props.text)
    this.choices = defaultTo([], props.choices)
    this.destination = defaultTo('', props.destination)
    this.script = props.script
  }

  dialogue(
    message: string,
    speaker: DataSprite | undefined = undefined,
    position: SceneTextType = SceneTextType.DEFAULT
  ) {
    this.text.push({
      message: message.replaceAll('|', '  \n'),
      speaker,
      position,
    })
    if (speaker && !this.sprites.includes(speaker)) {
      this.sprites.push(speaker)
    }
    return this
  }

  choice(message: string[], choices: SceneChoice[]) {
    this.momentType = SceneMomentType.CHOICE
    this.text = [
      {
        message: message.join('  \n'),
        speaker: undefined,
        position: SceneTextType.DEFAULT,
      },
    ]
    this.choices = choices
    return this
  }

  jump(destination: SceneIdentifier) {
    this.momentType = SceneMomentType.JUMP
    this.destination = destination
    return this
  }
}

// A scene is just a series of moments
export type Scene = SceneMoment[]

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
  return new SceneMoment().dialogue(message, speaker, position)
}

export function choice(message: string[], choices: SceneChoice[]): SceneMoment {
  return new SceneMoment().choice(message, choices)
}

export function jump(destination: SceneIdentifier): SceneMoment {
  return new SceneMoment().jump(destination)
}
