import { Planet } from "./Planet";
import { ControlCamera, ControlCameraControls } from "./ControlCamera";

const PLAYER_SPEED = 3.5;

export class Player {
    sprite: Phaser.GameObjects.Sprite;

    speed = {
        x: 0,
        y: 0
    };

    state: 'jumping' | 'descending' | 'walking' = 'walking';

    currentSpeed = 0;
    currentGravity = 0;

    constructor(scene: Phaser.Scene) {
        var config = {
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        };
    
        scene.anims.create(config);

        var config2 = {
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1,
        };
    
        scene.anims.create(config2);
        
        this.sprite = scene.add.sprite(0, 0, 'player');

        this.sprite.setAngle(90);
    }

    update(cursors: CursorKeys, cameraCursors: ControlCameraControls) {
        switch(this.state) {
            case 'walking': 
                if (cursors.right.isDown || cameraCursors.rigthDown) {
                    this.sprite.setFlipX(false);
                    this.sprite.anims.play('walk', true);
                }
                if (cursors.left.isDown || cameraCursors.leftDown) {
                    this.sprite.setFlipX(true);
                    this.sprite.anims.play('walk', true);
                }

                if ((cursors.right.isUp && cursors.left.isUp) &&
                (!cameraCursors.leftDown && !cameraCursors.rigthDown)) {
                    this.sprite.anims.stop();
                }

                if (cursors.space.isDown || cameraCursors.aDown) {
                    this.sprite.anims.play('jump', true);
                    this.state = 'jumping';
                }
                break;
            case 'jumping': 
                this.speed.y += this.currentGravity;
                
                if (this.speed.y >= 60) {
                    this.state = 'descending';
                }
                break;

            case 'descending': {
                this.speed.y -= this.currentGravity;

                if (this.speed.y <= 0) {
                    this.speed.y = 0;
                    this.sprite.anims.stop();
                    this.state = 'walking';
                }
            }
        }

        if (cursors.right.isDown || cameraCursors.rigthDown) {
            this.move();
        }

        if (cursors.left.isDown || cameraCursors.leftDown) {
            this.move(true);
        }
    }

    move(backguards = false) {
        const direction = backguards ? -1 : 1;

        this.speed.x = this.speed.x + (direction * this.currentSpeed);
        this.sprite.rotation = this.sprite.rotation + (direction * this.currentSpeed);
    }

    setPlanet(planet: Planet) {
        this.currentSpeed = PLAYER_SPEED / planet.lon;
        this.currentGravity = planet.gravity;
    }
}
