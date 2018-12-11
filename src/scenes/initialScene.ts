
function moveObjectAroundObject(
    objectA: Phaser.GameObjects.Sprite,
    objectB: Phaser.GameObjects.Sprite,
    speed: number,
    offset: number = 0) {

    const rad = (objectB.displayWidth / 2) + (objectA.displayWidth / 2) + offset;
    objectA.x = objectB.x + Math.cos(speed) * rad;
    objectA.y = objectB.y + Math.sin(speed) * rad;
}

export class initialScene extends Phaser.Scene {
    private moon: Phaser.GameObjects.Sprite;
    private sun: Phaser.GameObjects.Sprite;
    private earth: Phaser.GameObjects.Sprite;
    private graphics: Phaser.GameObjects.Graphics;
    private rotationSpeedMoon = Math.PI / 180 * 0;
    private rotationSpeedEarth = Math.PI / 180 * 0;
    private cursors: CursorKeys;
    private camera: Phaser.Cameras.Sprite3D.OrthographicCamera;
    private position: Phaser.Math.Vector3;

    constructor() {
        super({
          key: 'initialScene'
        });
    }

    preload(): void {
        this.load.image('sun', './src/assets/sun.png');
        this.load.image('earth', './src/assets/earth.png');
        this.load.image('moon', './src/assets/moon.png');
    }

    create(): void {
        this.sun = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'sun').setDisplaySize(200, 200);
        this.earth = this.add.sprite(400, 300, 'earth').setDisplaySize(60, 60);
        this.moon = this.add.sprite(400, 300, 'moon').setDisplaySize(10, 10);

        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0xFFFFFF);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setZoom(1);

        this.cameras.main.startFollow(this.earth)
    }

    update(): void {
        this.rotationSpeedMoon -= .01;
        this.rotationSpeedEarth -= .001;

        moveObjectAroundObject(this.moon, this.earth, this.rotationSpeedMoon, 200);
        moveObjectAroundObject(this.earth, this.sun, this.rotationSpeedEarth, 4000);

        if (this.cursors.up.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom + .01);
        }

        if (this.cursors.down.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom - .01);
        }

        if (this.cursors.left.isDown) {
            this.cameras.main.setPosition(this.cameras.main.x + 10, this.cameras.main.y);
        }

        if (this.cursors.right.isDown) {
            this.cameras.main.setPosition(this.cameras.main.x - 10, this.cameras.main.y);
        }
    }

}
