abstract class PlanetOptions {
    radius: number;
    color?: number;
    x?: number;
    y?: number;
    gravity?: number;
}

export class Planet {
    sprite: Phaser.GameObjects.Sprite;
    speed = 0;
    lon: number;
    gravity: number;

    constructor(
        scene: Phaser.Scene,
        id: string,
        options: PlanetOptions) {
        const circle = new Phaser.Geom.Circle(options.radius, options.radius, options.radius);

        this.lon = circle.diameter * Math.PI;
        this.gravity = options.gravity || 9.8;

        const graphics = scene.make.graphics({ x: options.x, y: options.y, add: false });
        graphics.fillStyle(options.color);
        graphics.fillCircleShape(circle);
        graphics.generateTexture(id, options.radius * 2, options.radius * 2);

        this.sprite = scene.add.sprite(options.x, options.y, id);
    }

    showCircle() {

    }

}
