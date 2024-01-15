import asset from './asset-engine'
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
} from './scene-engine'
import sprite from './sprite-engine'

const HOODIE_GIRL = sprite(
  'Hoodie Girl',
  'default',
  SceneSpritePosition.CHARACTER_LEFT
)
const SCHOOLGIRL = sprite(
  'Schoolgirl',
  'default',
  SceneSpritePosition.CHARACTER_RIGHT
)

const CLASSROOM = asset('SchoolClassroomBackground')

const hoodieGirlIntroduction: Scene = sceneContext({ sprites: [HOODIE_GIRL] }, [
  dialogue(
    [
      'Hi there.',
      "I'm Hoodie Girl. Click anywhere on the screen",
      'to continue.',
    ],
    HOODIE_GIRL
  ),
  dialogue(
    ["I'm here to", 'introduce the basics of', 'the Menagerie VN.'],
    HOODIE_GIRL
  ),
  dialogue(
    [
      "Right now it's ",
      'pretty bare bones,',
      "but it's all Typescript",
      ' which makes the',
      'author happy.',
    ],
    HOODIE_GIRL
  ),
  dialogue(['If you click again,', 'it should jump you to', 'another scene']),
  ...sceneContext(
    {
      script: (self, gameState, worldState) => {
        console.dir({ gameState, worldState })
        return {
          ...self,
          text: [
            {
              message: `Scripts can modify text`,
              speaker: undefined,
              position: SceneTextType.DEFAULT,
            },
          ],
        }
      },
    },
    [dialogue(['Running a script here'])]
  ),
  jump('conversation'),
])

const conversation: Scene = sceneContext({ background: CLASSROOM }, [
  ...sceneContext({ sprites: [HOODIE_GIRL, SCHOOLGIRL] }, [
    dialogue(['Now there are', '*two* of them!'], undefined),
    dialogue(['Hello there!'], HOODIE_GIRL),
    exchange([
      dialogue(['Anyway, you can', 'take over here'], HOODIE_GIRL),
      dialogue(['Thanks'], SCHOOLGIRL),
    ]),
  ]),
  ...sceneContext({ sprites: [SCHOOLGIRL] }, [
    dialogue(['Goodbye hoodie girl'], SCHOOLGIRL),
    dialogue(['I never liked [her]{.vn-angry} anyway'], SCHOOLGIRL),
    choice(
      ['Who do you like more?'],
      [
        { label: HOODIE_GIRL.name, destination: 'hoodieGirlPreference' },
        { label: SCHOOLGIRL.name, destination: 'schoolgirlPreference' },
      ]
    ),
  ]),
])

const hoodieGirlPreference: Scene = sceneContext(
  { background: CLASSROOM, sprites: [HOODIE_GIRL] },
  [
    dialogue(['Yaay I win'], HOODIE_GIRL),
    dialogue(['Click anywhere', 'to restart']),
    jump('default'),
  ]
)

const schoolgirlPreference: Scene = sceneContext(
  { background: CLASSROOM, sprites: [SCHOOLGIRL] },
  [
    dialogue(['Hah, I knew it'], SCHOOLGIRL),
    dialogue(['Click anywhere', 'to restart']),
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
  return sceneTreeRecords[scene] || sceneTreeRecords['default']
}

export function allSceneTrees() {
  return sceneTreeRecords
}

export default sceneTree
