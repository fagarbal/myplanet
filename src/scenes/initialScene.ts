
import { Planet } from '../models/Planet';
import { Player } from '../models/Player';

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
    sun: Planet;
    earth: Planet;
    moon: Planet;

    player: Player;

    cursors: CursorKeys;

    constructor() {
        super({
            key: 'initialScene'
        });
    }

    preload(): void {
        this.load.spritesheet('player', './src/assets/player.png', { frameWidth: 70, frameHeight: 70 });
    }

    create(): void {
        this.player = new Player(this);
        this.sun = new Planet(this, 'sun', {
            radius: 1090,
            color: 0xF9D71C,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        this.earth = new Planet(this, 'earth', {
            radius: 200,
            color: 0x0077BE,
            gravity: 1.5
        });


        this.moon = new Planet(this, 'moon', {
            radius: 60,
            color: 0xFFFFFF
        });
        this.player.setPlanet(this.earth);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setAngle(270);
        this.cameras.main.startFollow(this.player.sprite);
    }

    update(): void {
        if (this.cursors.up.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 1.01);
        }

        if (this.cursors.down.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 0.99);
        }

        this.earth.speed -= .005;
        this.moon.speed += .003;
        
        this.player.update(this.cursors);

        moveObjectAroundObject(this.earth.sprite, this.sun.sprite, this.earth.speed, 50000);
        moveObjectAroundObject(this.moon.sprite, this.earth.sprite, this.moon.speed, 2000);
        moveObjectAroundObject(this.player.sprite, this.earth.sprite, this.player.speed.x, this.player.speed.y);
    }

}
