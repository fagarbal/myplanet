
export interface ControlCameraControls {
    leftDown: boolean;
    rigthDown: boolean;
    upDown: boolean;
    downDown: boolean;
    aDown: boolean;
}

export class ControlCamera {
    camera: Phaser.Cameras.Scene2D.Camera;

    left: Phaser.GameObjects.Sprite;
    right: Phaser.GameObjects.Sprite;
    up: Phaser.GameObjects.Sprite;
    down: Phaser.GameObjects.Sprite;
    buttonA: Phaser.GameObjects.Sprite;

    container: Phaser.GameObjects.Container;

    controls = {
        leftDown: false,
        rigthDown: false,
        upDown: false,
        downDown: false,
        aDown: false
    };

    constructor(scene: Phaser.Scene) {
        this.camera = scene.cameras.add(0, 0, innerWidth, innerHeight);


        this.left = scene.add.sprite(0, 0, 'left');

        this.left.setX(this.left.width);
        this.left.setY(innerHeight - this.left.height)

        this.right = scene.add.sprite(0, 0, 'right');

        this.right.setX(this.right.width + this.left.x + (this.left.width / 2));
        this.right.setY(innerHeight - this.right.height)


        this.buttonA = scene.add.sprite(0, 0, 'buttona');

        this.buttonA.setX(innerWidth - this.buttonA.width);
        this.buttonA.setY(innerHeight - this.buttonA.height)


        this.up = scene.add.sprite(0, 0, 'up');

        this.up.setX(innerWidth - this.up.width * 2.5);
        this.up.setY(this.up.height)

        this.down = scene.add.sprite(0, 0, 'down');

        this.down.setX(innerWidth - this.down.width);
        this.down.setY(this.down.height)


        this.container = scene.add.container(0, 0, [this.left, this.right, this.up, this.down, this.buttonA]);

        this.left.setInteractive();
        this.right.setInteractive();
        this.up.setInteractive();
        this.down.setInteractive();
        this.buttonA.setInteractive();

        this.left.on('pointerdown', () => {
            this.controls.leftDown = true;
        })

        this.right.on('pointerdown', () => {
            this.controls.rigthDown = true;
        })

        this.left.on('pointerout', () => {
            this.controls.leftDown = false;
        })

        this.right.on('pointerout', () => {
            this.controls.rigthDown = false;
        })

        this.up.on('pointerdown', () => {
            this.controls.upDown = true;
        })

        this.up.on('pointerout', () => {
            this.controls.upDown = false;
        })

        this.down.on('pointerdown', () => {
            this.controls.downDown = true;
        })

        this.down.on('pointerout', () => {
            this.controls.downDown = false;
        })

        this.buttonA.on('pointerdown', () => {
            this.controls.aDown = true;
        })

        this.buttonA.on('pointerout', () => {
            this.controls.aDown = false;
        })
    }
}