import Phaser from 'phaser'
import GameScene from './assets/game/GameScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  backgroundColor: '#222222',
  scene: [GameScene]
}

new Phaser.Game(config)