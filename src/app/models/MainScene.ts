export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  create() {
    console.log('create method');
    const rotateConfig = {
      key: 'rotateAnimation',
      frames: this.anims.generateFrameNumbers('coin', {}),
      frameRate: 6,
      repeat: -1
    };
    this.anims.create(rotateConfig);
    this.add.sprite(150, 150, 'coin').play('rotateAnimation');
  }

  preload() {
    console.log('preload method');
    this.load.spritesheet('coin', 'assets/sprites/coin_spritesheet.png', { frameWidth: 22, frameHeight: 22 });
  }

  update() {
    console.log('update method');
  }
}
