import Phaser from 'phaser'
import { createSettingsMenu } from '../ui/settingsMenu.js'
import {
    createCameraState,
    setWorldBounds,
    updateCameraMovement
} from '../settings/cameraSettings.js'
import { getMapConfig } from '../maps/index.js'
import { renderMapObject } from '../objects/objectRenderer.js'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image('plant2', 'sprites/plant.png')
        this.load.image('desk', 'sprites/desk.png')
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

        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
        this.mapWidth = mapWidth
        this.mapHeight = mapHeight
        this.currentMap = 'open_office'

        const tiles = []

        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                const screenX = (x - y) * (tileWidth / 2)
                const screenY = (x + y) * (tileHeight / 2)
                tiles.push({ x, y, screenX, screenY })
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

        this.floorContainer = this.add.container(0, 0)
        this.objectContainer = this.add.container(0, 0)

        this.worldLayer.add(this.floorContainer)
        this.worldLayer.add(this.objectContainer)

        this.tiles = tiles

        this.drawMap()

        setWorldBounds(this, centerX, centerY, mapCenterX, mapCenterY)
        createSettingsMenu(this)
    }

    drawMap() {
        this.floorContainer.removeAll(true)
        this.objectContainer.removeAll(true)

        const mapConfig = getMapConfig(this.currentMap)
        const floor = mapConfig.floor || {}

        for (const tile of this.tiles) {
            const diamond = this.add.polygon(tile.screenX, tile.screenY, [
                0, -this.tileHeight / 2,
                this.tileWidth / 2, 0,
                0, this.tileHeight / 2,
                -this.tileWidth / 2, 0
            ], floor.color ?? 0xb8c7d1).setStrokeStyle(
                floor.strokeWidth ?? 1,
                floor.strokeColor ?? 0xffffff
            )

            this.floorContainer.add(diamond)
        }

        for (const item of mapConfig.objects || []) {
            renderMapObject(this, this.objectContainer, item)
        }
    }

    setMap(mapKey) {
        this.currentMap = mapKey
        this.drawMap()
    }

    update(time, delta) {
        updateCameraMovement(this, delta)
    }
}