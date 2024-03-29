import asset from '../asset-engine'
import {
  Scene,
  sceneContext,
  jump,
  SceneSpritePosition,
  DataSprite,
  dialogue,
  SceneTree,
  choice,
} from '../scene-engine'

import SummerDefaultUrl from '../assets/SummerDefault.png?url'
import SummerHandOnHipUrl from '../assets/SummerHandOnHip.png?url'
import SummerHandsBehindBackUrl from '../assets/SummerHandsBehindBack.png?url'
import SummerTalkingUrl from '../assets/SummerTalking.png?url'
import SummerUwutUrl from '../assets/SummerUwu.png?url'

const SummerDefault: DataSprite = {
  asset: SummerDefaultUrl,
  position: SceneSpritePosition.CHARACTER_RIGHT,
}
const SummerHandOnHip: DataSprite = {
  asset: SummerHandOnHipUrl,
  position: SceneSpritePosition.CHARACTER_LEFT,
}
const SummerHandsBehindBack: DataSprite = {
  asset: SummerHandsBehindBackUrl,
  position: SceneSpritePosition.CHARACTER_LEFT,
}
const SummerTalking: DataSprite = {
  asset: SummerTalkingUrl,
  position: SceneSpritePosition.CHARACTER_LEFT,
}
const SummerUwu: DataSprite = {
  asset: SummerUwutUrl,
  position: SceneSpritePosition.CHARACTER_LEFT,
}

const CLASSROOM = asset('SchoolClassroomBackground')

const spritesScene: Scene = sceneContext({ background: CLASSROOM }, [
  dialogue(
    'Sprites were created|using Manga Maker ComiPo|by the author',
    SummerTalking
  ),
  dialogue(
    'The game had|a series of fun little|comics years ago',
    SummerTalking
  ),
  dialogue(
    'The sprites|originated there, and have|been reused for this',
    SummerUwu
  ),
  choice('Do you enjoy the sprites?', [
    { label: 'Yes!', destination: 'sprites.yes' },
    { label: 'No!', destination: 'sprites.no' },
  ]),
])

const yesScene: Scene = sceneContext({ background: CLASSROOM }, [
  dialogue('Yaay!', SummerTalking),
  jump('sprites.continue'),
])

const noScene: Scene = sceneContext({ background: CLASSROOM }, [
  dialogue('Boo!', SummerTalking),
  jump('sprites.continue'),
])

const continueScene: Scene = sceneContext({ background: CLASSROOM }, [
  dialogue('Back to the start!', SummerTalking),
  jump('default'),
])

export default {
  sprites: spritesScene,
  'sprites.yes': yesScene,
  'sprites.no': noScene,
  'sprites.continue': continueScene,
} as SceneTree
