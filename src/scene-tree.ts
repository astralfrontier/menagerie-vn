import HoodieGirlImage from './assets/wp8198578.webp?url'
import SchoolgirlImage from './assets/anime_girl_PNG88.png?url'
import {
  SceneSprite,
  SceneSpritePosition,
  Scene,
  sceneContext,
  dialogue,
  SceneTextType,
  SceneIdentifier,
  jump,
} from './scene-engine'

const HOODIE_GIRL: SceneSprite = {
  asset: HoodieGirlImage,
  position: SceneSpritePosition.CHARACTER_LEFT,
}

const ANIME_GIRL: SceneSprite = {
  asset: SchoolgirlImage,
  position: SceneSpritePosition.CHARACTER_RIGHT,
}

const hoodieGirlIntroduction: Scene = sceneContext({ sprites: [HOODIE_GIRL] }, [
  dialogue(
    "Hi there. I'm Hoodie Girl. Click anywhere to continue.",
    'Hoodie Girl'
  ),
  dialogue("I'm here to introduce the basic concepts of the Menagerie VN."),
  dialogue(
    "Right now it's pretty bare bones, but it's functional Typescript which makes the author happy."
  ),
  dialogue('If you click again, it should jump you to another scene'),
  jump('conversation'),
])

const conversationScene: Scene = [
  ...sceneContext({ sprites: [HOODIE_GIRL, ANIME_GIRL] }, [
    dialogue('Now there are two of them!', '', SceneTextType.WORRIED),
    dialogue('Hello there!', 'Hoodie Girl'),
    dialogue('Anyway, you can take over here', 'Hoodie Girl'),
  ]),
  ...sceneContext({ sprites: [ANIME_GIRL] }, [
    dialogue('Goodbye hoodie girl', 'Schoolgirl'),
    dialogue('I never liked her anyway', 'Schoolgirl', SceneTextType.ANGRY),
    dialogue('Clicking again will restart the game'),
  ]),
  jump('default'),
]

const sceneTree: Record<SceneIdentifier, Scene> = {
  default: hoodieGirlIntroduction,
  conversation: conversationScene,
}

export default sceneTree
