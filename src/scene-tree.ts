import { mergeAll } from 'ramda'
import { SceneIdentifier, SceneTree } from './scene-engine'

import defaultScene from './scenes/default'
import techScene from './scenes/tech'
import spritesScene from './scenes/sprites'

const sceneTreeRecords: SceneTree = mergeAll([
  defaultScene,
  techScene,
  spritesScene,
])

// TODO: scene trees can be transformed based on game state
function sceneTree(scene: SceneIdentifier) {
  return sceneTreeRecords[scene] || sceneTreeRecords['default']
}

export function allSceneTrees() {
  return sceneTreeRecords
}

export default sceneTree
