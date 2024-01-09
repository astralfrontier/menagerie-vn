import HoodieGirl from './assets/wp8198578.webp?url'
import Schoolgirl from './assets/anime_girl_PNG88.png?url'

// TODO: figure this out later
export type SceneSprite = string | undefined

// A moment in the scene, defined as all the state needed to show the player some information or dialogue
export type SceneMoment = SceneDialogueMoment

// A moment of dialogue, including one of three sprites, a background image,
// speech bubble definitions, text, and so on.
export interface SceneDialogueMoment {
  momenttype: 'SceneDialogueMoment'
  text: string
  left: SceneSprite
  right: SceneSprite
}

// A scene is just a series of moments
export type Scene = SceneMoment[]

const NOBODY = undefined

function dialogue(
  text: string,
  left?: SceneSprite,
  right?: SceneSprite
): SceneDialogueMoment {
  return {
    momenttype: 'SceneDialogueMoment',
    text,
    left,
    right,
  }
}

export const defaultScene: Scene = [
  dialogue('Hello There!', HoodieGirl, NOBODY),
  dialogue('More of the same', HoodieGirl, NOBODY),
  dialogue('Now there are two of them!', HoodieGirl, Schoolgirl),
  dialogue(
    'Clicking for more dialogue will restart the scene',
    NOBODY,
    Schoolgirl
  ),
]
