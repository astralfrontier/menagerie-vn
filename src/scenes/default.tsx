import asset from '../asset-engine'
import {
  Scene,
  sceneContext,
  dialogue,
  choice,
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

const defaultScene: Scene = sceneContext({ background: CLASSROOM }, [
  dialogue('Hi there!|My name is Summer Newman.|Click to go on', SummerTalking),
  dialogue(
    'This is a short|demo of a visual novel|with a custom engine',
    SummerHandOnHip
  ),
  dialogue('It features choices,|speech bubbles, scripts|and more!', SummerUwu),
  dialogue(
    'Also, just for|this demo, I can teleport.|Watch',
    SummerHandsBehindBack
  ),
  dialogue('See?', SummerDefault),
  choice(
    ['What do you want to learn more about?'],
    [
      { label: 'The technology', destination: 'tech' },
      { label: 'The character sprites', destination: 'sprites' },
    ]
  ),
])

export default defaultScene
