import { makeAutoObservable } from 'mobx'
import { SceneIdentifier } from './scene-engine'

/**
 * Game State covers things like which scene tree is active.
 * It doesn't include world state, e.g. flags set during scenes.
 * If you serialize this object plus any world state,
 * you should be able to save your game.
 */
export class GameState {
  sceneIdentifier: SceneIdentifier
  sceneIndex: number

  constructor() {
    this.sceneIdentifier = 'default'
    this.sceneIndex = 0
    makeAutoObservable(this)
  }

  jump(destination: SceneIdentifier) {
    this.sceneIdentifier = destination
    this.sceneIndex = 0
  }

  // TODO: there's no guard here to keep the scene from advancing past the end
  advance() {
    this.sceneIndex = this.sceneIndex + 1
  }
}

const gameState = new GameState()

export { gameState }
