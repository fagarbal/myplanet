
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
    private player: Phaser.GameObjects.Sprite;
    private satellite: Phaser.GameObjects.Sprite;
    private graphics: Phaser.GameObjects.Graphics;
    private rotationSpeedMoon = Math.PI / 180 * 0;
    private rotationSpeedEarth = Math.PI / 180 * 0;
    private cursors: CursorKeys;
    private camera: Phaser.Cameras.Sprite3D.OrthographicCamera;
    private position: Phaser.Math.Vector3;
    private playerSpeedX: number = 0;
    private playerSpeedY: number = 0;
    private jumping = false;
    private descending = false;

    constructor() {
        super({
          key: 'initialScene'
        });
    }

    preload(): void {
        this.load.image('sun', './src/assets/sun.png');
        this.load.image('earth', './src/assets/earth.png');
        this.load.image('moon', './src/assets/moon.png');
        this.load.image('player', './src/assets/player.png');
        this.load.image('satellite', './src/assets/satellite.png');
    }

    create(): void {
        this.sun = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'sun').setDisplaySize(20000, 20000);
        this.earth = this.add.sprite(400, 300, 'earth').setDisplaySize(3000, 3000);
        this.moon = this.add.sprite(400, 300, 'moon').setDisplaySize(1000, 1000);
        this.player = this.add.sprite(400, 300, 'player').setDisplaySize(10, 10);
        this.satellite = this.add.sprite(400, 300, 'satellite').setDisplaySize(36, 27);

        this.player.rotation = 1.5;

        this.cameras.main.rotation = -1.5;

        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0xFFFFFF);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setZoom(5);

        this.cameras.main.startFollow(this.player)

        this.cameras.main.y += 100;

        moveObjectAroundObject(this.player, this.earth, this.playerSpeedX, this.playerSpeedY)
    }

    update(): void {
        this.rotationSpeedMoon += .003;
        this.rotationSpeedEarth -= .001;

        this.satellite.rotation += .003;

        moveObjectAroundObject(this.moon, this.earth, this.rotationSpeedMoon, 10000);
        moveObjectAroundObject(this.satellite, this.moon, this.rotationSpeedMoon, 60);

        moveObjectAroundObject(this.earth, this.sun, this.rotationSpeedEarth, 150000);

        if (this.cursors.up.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 1.01);
        }

        if (this.cursors.down.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 0.99);
        }

        if (this.cursors.space.isDown && !this.jumping && !this.descending) {
            this.jumping = true;
        }

        if (this.jumping) {
            if (this.playerSpeedY <= 40) {
                this.playerSpeedY += .5;
            } else {
                this.jumping = false;
                this.descending = true;
            }
        }

        if (this.descending) {
            if (this.playerSpeedY <= 0) {
                this.playerSpeedY = 0;
                this.descending = false;
            } else {
                this.playerSpeedY -= .5;
            }
        }

        if (this.playerSpeedY < 0) this.playerSpeedY = 0;

        if (this.cursors.right.isDown) {
            this.playerSpeedX += .002;
            this.player.rotation += .002;
            this.cameras.main.rotation -= 0.002;
        }

        if (this.cursors.left.isDown) {
            this.playerSpeedX -= .002;
            this.player.rotation -= .002;
            this.cameras.main.rotation += 0.002;
        }

        moveObjectAroundObject(this.player, this.moon, this.playerSpeedX, this.playerSpeedY);
    }

}
