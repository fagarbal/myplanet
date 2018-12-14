
function moveObjectAroundObject(
    objectA: Phaser.GameObjects.Sprite,
    objectB: Phaser.GameObjects.Sprite,
    speed: number,
    offset: number = 0) {

    const rad = (objectB.displayWidth / 2) + (objectA.displayWidth / 2) + offset;
    objectA.x = objectB.x + Math.cos(speed) * rad;
    objectA.y = objectB.y + Math.sin(speed) * rad;
}

abstract class PlanetOptions {
    radius: number;
    color?: number;
    x?: number;
    y?: number;
}

class Planet {
    sprite: Phaser.GameObjects.Sprite;
    speed = 0;

    constructor(
        scene: Phaser.Scene,
        id: string,
        options: PlanetOptions) {
        const circle = new Phaser.Geom.Circle(options.radius, options.radius, options.radius);

        const graphics = scene.make.graphics({ x: options.x, y: options.y, add: false });
        graphics.fillStyle(options.color);
        graphics.fillCircleShape(circle);
        graphics.generateTexture(id, options.radius * 2, options.radius * 2);

        this.sprite = scene.add.sprite(options.x, options.y, id);
    }

    showCircle() {

    }

}

export class initialScene extends Phaser.Scene {
    sun: Planet;
    earth: Planet;
    moon: Planet;

    player: Phaser.GameObjects.Sprite;

    cursors: CursorKeys;

    playerSpeedX = 0;
    playerSpeedY = 0;

    jumping = false;
    descending = false;

    constructor() {
        super({
            key: 'initialScene'
        });
    }

    preload(): void {
        this.load.spritesheet('player', './src/assets/player.png', { frameWidth: 70, frameHeight: 70 });
    }

    create(): void {
        this.sun = new Planet(this, 'sun', {
            radius: 1090,
            color: 0xF9D71C,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        this.earth = new Planet(this, 'earth', {
            radius: 200,
            color: 0x0077BE
        });

        this.moon = new Planet(this, 'moon', {
            radius: 60,
            color: 0xFFFFFF
        });

        var config = {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        };
    
        this.anims.create(config);

        var config2 = {
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1
        };
    
        this.anims.create(config2);
        
        this.player = this.add.sprite(0, 0, 'player');

        this.player.setAngle(90);
        this.cameras.main.setAngle(270);
    
        this.player.anims.load('walk');
        this.player.anims.load('jump');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.earth.sprite);
    }

    update(): void {
        if (this.cursors.up.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 1.01);
        }

        if (this.cursors.down.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 0.99);
        }

        if (this.cursors.right.isDown ) {
            if (!this.jumping && !this.descending) {
                this.player.setFlipX(false);
                this.player.anims.play('walk', true);
            }
            this.playerSpeedX += .01;
            this.player.rotation += .01;
        }

        if (this.cursors.left.isDown) {
            if (!this.jumping && !this.descending) {
                this.player.setFlipX(true);
                this.player.anims.play('walk', true);
            }
            this.playerSpeedX -= .01;
            this.player.rotation -= .01;
        }


        if (this.cursors.right.isUp && this.cursors.left.isUp && !this.jumping && !this.descending) {
            this.player.anims.stop();
        }

        if (this.cursors.space.isDown && !this.jumping && !this.descending) {
            this.player.anims.play('jump', true);
            this.jumping = true;
        }

        if (this.jumping) {
            if (this.playerSpeedY <= 60) {
                this.playerSpeedY += 1;
            } else {
                this.jumping = false;
                this.descending = true;
            }
        }

        if (this.descending) {
            if (this.playerSpeedY <= 0) {
                this.playerSpeedY = 0;
                this.player.anims.stop();
                this.descending = false;
            } else {
                this.playerSpeedY -= 1.5;
            }
        }

        if (this.playerSpeedY < 0) this.playerSpeedY = 0;

        this.earth.speed -= .005;
        this.moon.speed += .003;
        
        moveObjectAroundObject(this.earth.sprite, this.sun.sprite, this.earth.speed, 10000);
        moveObjectAroundObject(this.moon.sprite, this.earth.sprite, this.moon.speed, 1000);
        moveObjectAroundObject(this.player, this.earth.sprite, this.playerSpeedX, this.playerSpeedY);
    }

}
