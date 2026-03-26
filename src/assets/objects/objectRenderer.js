import { OBJECT_TYPES } from './objectTypes.js'

export function renderMapObject(scene, mapContainer, item) {
    const def = OBJECT_TYPES[item.type]
    if (!def) return

    const screenX = (item.x - item.y) * (scene.tileWidth / 2)
    const screenY = (item.x + item.y) * (scene.tileHeight / 2) + (def.offsetY ?? 0)

    let object = null

    if (def.renderMode === 'sprite') {
        object = scene.add.image(screenX, screenY + (def.offsetY ?? 0), def.texture)
        object.setScale(def.scale ?? 2)
        object.setOrigin(0.5, 1)
    }

    if (def.renderMode === 'rectangle') {
        object = scene.add.rectangle(
            screenX,
            screenY,
            def.width ?? 20,
            def.height ?? 20,
            def.color ?? 0xffffff
        )
    }

    if (def.renderMode === 'ellipse') {
        object = scene.add.ellipse(
            screenX,
            screenY,
            def.width ?? 20,
            def.height ?? 20,
            def.color ?? 0xffffff
        )
    }

    if (def.renderMode === 'circle') {
        object = scene.add.circle(
            screenX,
            screenY,
            def.radius ?? 10,
            def.color ?? 0xffffff
        )
    }

    if (object) {
        mapContainer.add(object)
    }
}