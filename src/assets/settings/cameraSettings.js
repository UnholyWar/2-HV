import Phaser from 'phaser'

export function createCameraState(scene) {
    scene.vx = 0
    scene.vy = 0
}

export function setWorldBounds(scene, centerX, centerY, mapCenterX, mapCenterY) {
    scene.minWorldX = centerX - mapCenterX - 300
    scene.maxWorldX = centerX - mapCenterX + 300
    scene.minWorldY = centerY - mapCenterY - 200
    scene.maxWorldY = centerY - mapCenterY + 200
}

export function updateCameraMovement(scene, delta) {
    const accel = 0.03 * delta
    const friction = 0.02 * delta
    const maxSpeedX = 12
    const maxSpeedY = 8

    if (scene.cursors.left.isDown) scene.vx += accel
    if (scene.cursors.right.isDown) scene.vx -= accel
    if (scene.cursors.up.isDown) scene.vy += accel
    if (scene.cursors.down.isDown) scene.vy -= accel

    scene.vx = Phaser.Math.Clamp(scene.vx, -maxSpeedX, maxSpeedX)
    scene.vy = Phaser.Math.Clamp(scene.vy, -maxSpeedY, maxSpeedY)

    if (!scene.cursors.left.isDown && !scene.cursors.right.isDown) {
        if (scene.vx > 0) scene.vx = Math.max(0, scene.vx - friction)
        if (scene.vx < 0) scene.vx = Math.min(0, scene.vx + friction)
    }

    if (!scene.cursors.up.isDown && !scene.cursors.down.isDown) {
        if (scene.vy > 0) scene.vy = Math.max(0, scene.vy - friction)
        if (scene.vy < 0) scene.vy = Math.min(0, scene.vy + friction)
    }

    scene.worldLayer.x = Phaser.Math.Clamp(
        scene.worldLayer.x + scene.vx,
        scene.minWorldX,
        scene.maxWorldX
    )

    scene.worldLayer.y = Phaser.Math.Clamp(
        scene.worldLayer.y + scene.vy,
        scene.minWorldY,
        scene.maxWorldY
    )
}