import {
  Scene,
  sceneContext,
  dialogue,
  SceneTextType,
  SceneIdentifier,
  jump,
  choice,
} from './scene-engine'
import { HOODIE_GIRL, SCHOOLGIRL } from './sprite-engine'

const hoodieGirlIntroduction: Scene = sceneContext({ sprites: [HOODIE_GIRL] }, [
  dialogue(
    "Hi there. I'm Hoodie Girl. Click the button to continue.",
    HOODIE_GIRL.name
  ),
  dialogue(
    "I'm here to introduce the basic concepts of the Menagerie VN.",
    HOODIE_GIRL.name
  ),
  dialogue(
    "Right now it's pretty bare bones, but it's functional Typescript which makes the author happy.",
    HOODIE_GIRL.name
  ),
  dialogue('If you click again, it should jump you to another scene'),
  jump('conversation'),
])

const conversation: Scene = [
  ...sceneContext({ sprites: [HOODIE_GIRL, SCHOOLGIRL] }, [
    dialogue('Now there are two of them!', '', SceneTextType.WORRIED),
    dialogue('Hello there!', HOODIE_GIRL.name),
    dialogue('Anyway, you can take over here', HOODIE_GIRL.name),
  ]),
  ...sceneContext({ sprites: [SCHOOLGIRL] }, [
    dialogue('Goodbye hoodie girl', SCHOOLGIRL.name),
    dialogue('I never liked her anyway', SCHOOLGIRL.name, SceneTextType.ANGRY),
    choice('Who do you like more?', [
      { label: HOODIE_GIRL.name, destination: 'hoodieGirlPreference' },
      { label: SCHOOLGIRL.name, destination: 'schoolgirlPreference' },
    ]),
  ]),
]

const hoodieGirlPreference: Scene = sceneContext({ sprites: [HOODIE_GIRL] }, [
  dialogue('Yaay I win', HOODIE_GIRL.name),
  dialogue('Click to restart'),
  jump('default'),
])

const schoolgirlPreference: Scene = sceneContext({ sprites: [SCHOOLGIRL] }, [
  dialogue('Hah, I knew it', SCHOOLGIRL.name),
  dialogue('Click to restart'),
  jump('default'),
])

const sceneTree: Record<SceneIdentifier, Scene> = {
  default: hoodieGirlIntroduction,
  conversation,
  hoodieGirlPreference,
  schoolgirlPreference,
}

export default sceneTree
