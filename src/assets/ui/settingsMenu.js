export function createSettingsMenu(scene) {
    const buttonWidth = 100
    const buttonHeight = 34
    const buttonX = scene.scale.width - buttonWidth - 12
    const buttonY = 10

    scene.settingsButton = scene.add.text(buttonX, buttonY, 'Settings', {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#444444',
        padding: { left: 10, right: 10, top: 6, bottom: 6 }
    })
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0)
        .setDepth(1000)

    const popupBg = scene.add.rectangle(400, 300, 320, 220, 0x111111, 0.95)
        .setStrokeStyle(2, 0xffffff)
        .setScrollFactor(0)

    const popupTitle = scene.add.text(330, 210, 'Settings', {
        fontSize: '28px',
        color: '#ffffff'
    })
        .setScrollFactor(0)

    const workersButton = scene.add.text(330, 260, 'Workers', {
        fontSize: '22px',
        color: '#ffffff',
        backgroundColor: '#3a3a3a',
        padding: { left: 10, right: 10, top: 6, bottom: 6 }
    })
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0)

    const mapsButton = scene.add.text(330, 310, 'Maps', {
        fontSize: '22px',
        color: '#ffffff',
        backgroundColor: '#3a3a3a',
        padding: { left: 10, right: 10, top: 6, bottom: 6 }
    })
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0)

    const closeButton = scene.add.text(560, 210, 'X', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#aa3333',
        padding: { left: 10, right: 10, top: 4, bottom: 4 }
    })
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0)

    scene.settingsPopup = scene.add.container(0, 0, [
        popupBg,
        popupTitle,
        workersButton,
        mapsButton,
        closeButton
    ])
        .setScrollFactor(0)
        .setDepth(1001)
        .setVisible(false)

    scene.settingsButton.on('pointerdown', () => {
        scene.settingsPopup.setVisible(true)
    })

    closeButton.on('pointerdown', () => {
        scene.settingsPopup.setVisible(false)
    })

    workersButton.on('pointerdown', () => {
        console.log('Workers clicked')
    })

    mapsButton.on('pointerdown', () => {
        console.log('Maps clicked')
    })
}