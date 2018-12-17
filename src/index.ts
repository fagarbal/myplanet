import "phaser";
import { initialScene } from "./scenes/initialScene";

/// <reference path="../../phaser.d.ts"/>

const config: GameConfig = {
    title: "Phaser3 BoilerPlate",
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,            
    scene: [initialScene],
    resolution: devicePixelRatio,
    pixelArt: true,
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: true
    }
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
      super(config);      
    }
}
  
window.onload = () => {
    var game = new Game(config);    
};
  