import {
  Scene,
  sceneContext,
  dialogue,
  SceneTextType,
  SceneIdentifier,
  jump,
  choice,
} from './scene-engine'
import sprite from './sprite-engine'

const HOODIE_GIRL = sprite('Hoodie Girl', 'default')
const SCHOOLGIRL = sprite('Schoolgirl', 'default')

import AnimeSchoolBackground from './assets/147385-download-free-anime-school-background-2560x1440.jpg'

const hoodieGirlIntroduction: Scene = sceneContext({ sprites: [HOODIE_GIRL] }, [
  dialogue(
    "Hi there. I'm Hoodie Girl. Click anywhere on the screen continue.",
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

const conversation: Scene = sceneContext(
  { background: AnimeSchoolBackground },
  [
    ...sceneContext({ sprites: [HOODIE_GIRL, SCHOOLGIRL] }, [
      dialogue('Now there are *two* of them!', '', SceneTextType.WORRIED),
      dialogue('Hello there!', HOODIE_GIRL.name),
      dialogue('Anyway, you can take over here', HOODIE_GIRL.name),
    ]),
    ...sceneContext({ sprites: [SCHOOLGIRL] }, [
      dialogue('Goodbye hoodie girl', SCHOOLGIRL.name),
      dialogue(
        'I never liked her anyway',
        SCHOOLGIRL.name,
        SceneTextType.ANGRY
      ),
      choice('Who do you like more?', [
        { label: HOODIE_GIRL.name, destination: 'hoodieGirlPreference' },
        { label: SCHOOLGIRL.name, destination: 'schoolgirlPreference' },
      ]),
    ]),
  ]
)

const hoodieGirlPreference: Scene = sceneContext(
  { background: AnimeSchoolBackground, sprites: [HOODIE_GIRL] },
  [
    dialogue('Yaay I win', HOODIE_GIRL.name),
    dialogue('Click anywhere to restart'),
    jump('default'),
  ]
)

const schoolgirlPreference: Scene = sceneContext(
  { background: AnimeSchoolBackground, sprites: [SCHOOLGIRL] },
  [
    dialogue('Hah, I knew it', SCHOOLGIRL.name),
    dialogue('Click to restart'),
    jump('default'),
  ]
)

const sceneTreeRecords: Record<SceneIdentifier, Scene> = {
  default: hoodieGirlIntroduction,
  conversation,
  hoodieGirlPreference,
  schoolgirlPreference,
}

// TODO: scene trees can be transformed based on game state
function sceneTree(scene: SceneIdentifier) {
  return sceneTreeRecords[scene]
}

export default sceneTree
