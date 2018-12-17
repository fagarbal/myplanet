abstract class PlanetOptions {
    radius: number;
    colors?: number[];
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

        this.gravity = options.gravity || 9.8;
        const graphics = scene.make.graphics({ x: options.x, y: options.y, add: false });

        const circle = new Phaser.Geom.Circle(options.radius, options.radius, options.radius);
        
        this.lon = circle.diameter * Math.PI;

        graphics.fillStyle(options.colors[0]);
        graphics.fillCircleShape(circle);

        options.colors.shift();

        const diff = [4, 16, 26, 36];

        options.colors.forEach((color, i) => {
            const circle = new Phaser.Geom.Circle(options.radius, options.radius, options.radius - diff[i]);

            graphics.fillCircleShape(circle);
            graphics.fillStyle(color);
        });
    
        graphics.generateTexture(id, circle.diameter , circle.diameter);


        this.sprite = scene.add.sprite(options.x, options.y, id);
    }


    showCircle() {

    }

}
