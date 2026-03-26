import Phaser from 'phaser'
import { createSettingsMenu } from '../ui/settingsMenu.js'
import {
    createCameraState,
    setWorldBounds,
    updateCameraMovement
} from '../settings/cameraSettings.js'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    create() {
        const tileWidth = 64
        const tileHeight = 32
        const mapWidth = 12
        const mapHeight = 12

        const centerX = this.scale.width / 2
        const centerY = this.scale.height / 2

        this.cursors = this.input.keyboard.createCursorKeys()
        createCameraState(this)

        const tiles = []

        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                const screenX = (x - y) * (tileWidth / 2)
                const screenY = (x + y) * (tileHeight / 2)
                tiles.push({ screenX, screenY })
            }
        }

        let minX = Infinity
        let maxX = -Infinity
        let minY = Infinity
        let maxY = -Infinity

        for (const tile of tiles) {
            if (tile.screenX < minX) minX = tile.screenX
            if (tile.screenX > maxX) maxX = tile.screenX
            if (tile.screenY < minY) minY = tile.screenY
            if (tile.screenY > maxY) maxY = tile.screenY
        }

        const mapCenterX = (minX + maxX) / 2
        const mapCenterY = (minY + maxY) / 2

        this.worldLayer = this.add.container(centerX - mapCenterX, centerY - mapCenterY)

        for (const tile of tiles) {
            const diamond = this.add.polygon(tile.screenX, tile.screenY, [
                0, -tileHeight / 2,
                tileWidth / 2, 0,
                0, tileHeight / 2,
                -tileWidth / 2, 0
            ], 0x666666).setStrokeStyle(1, 0xffffff)

            this.worldLayer.add(diamond)
        }

        setWorldBounds(this, centerX, centerY, mapCenterX, mapCenterY)
        createSettingsMenu(this)
    }

    update(time, delta) {
        updateCameraMovement(this, delta)
    }
}