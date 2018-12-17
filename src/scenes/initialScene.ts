
import { Planet } from '../models/Planet';
import { Player } from '../models/Player';
import { ControlCamera } from '../models/ControlCamera';
import { Tilemaps, Cameras } from 'phaser';

function moveObjectAroundObject(
    objectA: Phaser.GameObjects.Sprite,
    objectB: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container,
    speed: number,
    offset: number = 0) {

    const rad = (objectB.displayHeight / 2) + (objectA.displayHeight / 2) + offset;
    objectA.x = objectB.x + Math.cos(speed) * rad;
    objectA.y = objectB.y + Math.sin(speed) * rad;
}
    
export class initialScene extends Phaser.Scene {
    sun: Planet;
    earth: Planet;
    moon: Planet;

    controlCamera: ControlCamera;

    container: Phaser.GameObjects.Container;

    player: Player;

    cursors: CursorKeys;

    ship: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: 'initialScene'
        });
    }

    preload(): void {
        this.load.spritesheet('player', './src/assets/player.png', { frameWidth: 70, frameHeight: 70 });
        this.load.image('ship', './src/assets/ship.png');
        this.load.image('rock', './src/assets/rock.png');

        this.load.image('left', './src/assets/left.png');
        this.load.image('right', './src/assets/right.png');


        this.load.image('up', './src/assets/up.png');
        this.load.image('down', './src/assets/down.png');

        this.load.image('buttona', './src/assets/buttona.png');

    }

    create(): void {
        this.ship = this.add.sprite(0, 0, 'ship');

        this.player = new Player(this);

        this.sun = new Planet(this, 'sun', {
            radius: 1090,
            colors: [0xf9d71c],
            x: 0,
            y: 0,
        });

        this.earth = new Planet(this, 'earth', {
            radius: 150,
            colors: [
                0x91DD00,
                0x7EC000,
                0xBC803E,
                0xC68F58,
                0xCA9865,
            ],
            gravity: 1.5
        });

        this.moon = new Planet(this, 'moon', {
            radius: 60,
            colors: [0xFFFFFF]
        });
        this.player.setPlanet(this.earth);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setZoom(1);

        this.controlCamera = new ControlCamera(this);

        this.container = this.add.container(0, 0, [this.ship, this.player.sprite, this.earth.sprite, this.moon.sprite, this.sun.sprite]);

        this.controlCamera.camera.ignore(this.container);

        this.cameras.main.setAngle(270);
        this.cameras.main.startFollow(this.player.sprite);

        this.cameras.main.ignore(this.controlCamera.container);
    }

    update(): void {
        if (this.cursors.up.isDown || this.controlCamera.controls.upDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 1.01);
        }

        if (this.cursors.down.isDown || this.controlCamera.controls.downDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom * 0.99);
        }

        this.earth.speed -= .005;
        this.moon.speed += .003;
        
        this.player.update(this.cursors, this.controlCamera.controls);

        
        moveObjectAroundObject(this.earth.sprite, this.sun.sprite, this.earth.speed, 2000);
        moveObjectAroundObject(this.moon.sprite, this.earth.sprite, this.moon.speed, 500);
        this.ship.rotation = .5;
        moveObjectAroundObject(this.ship, this.earth.sprite, this.ship.rotation);
        this.ship.setAngle(this.ship.angle + 90);

        
        moveObjectAroundObject(this.player.sprite, this.earth.sprite, this.player.speed.x, this.player.speed.y);
    }

}
