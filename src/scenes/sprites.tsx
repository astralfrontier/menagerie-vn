import asset from '../asset-engine'
import {
  Scene,
  sceneContext,
  dialogue,
  SceneTextType,
  SceneIdentifier,
  jump,
  choice,
  SceneSpritePosition,
  exchange,
  DataSprite,
  monologue,
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
  monologue(
    ['Sprites were created', 'using Manga Maker ComiPo', 'by the author'],
    SummerTalking
  ),
  monologue(
    ['The game had', 'a series of fun little comics', 'some years back'],
    SummerTalking
  ),
  monologue(
    ['The sprites', 'originated there, and have', 'been reused for this'],
    SummerUwu
  ),
  monologue(['Back to the start!'], SummerHandsBehindBack),
  jump('default'),
])

export default spritesScene
