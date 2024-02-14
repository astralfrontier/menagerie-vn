import asset from '../asset-engine'
import {
  Scene,
  sceneContext,
  dialogue,
  jump,
  SceneSpritePosition,
  DataSprite,
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

const techScene: Scene = sceneContext({ background: CLASSROOM }, [
  dialogue(
    'This visual novel|engine is written using|React and Typescript',
    SummerTalking
  ),
  dialogue(
    'The author was|unhappy with other VNs|and wrote his own',
    SummerTalking
  ),
  dialogue(
    'It might seem|like showing off, but sometimes you need|a custom system',
    SummerUwu
  ),
  dialogue(
    'The software|is deployed to Netlify|on every commit',
    SummerHandsBehindBack
  ),
  dialogue('Back to the start!', SummerHandsBehindBack),
  jump('default'),
])

export default techScene
