class GameEngine extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameEngine' });
  }

  init(level){
    this.level = level;
    this.level.game = this;

    this.level.money = new MoneyStat(1000, this);
    this.level.environment = new EnvironmentalStat(0, this);
    this.level.tech = new TechnologicalStat(0, this);
    this.level.social = new SocialStat(0, this);

    this.level.time = new Time(this, this.level);
    this.level.chat = new Chat(this.level);
    this.level.event = new Event(this, this.level);

    this.productivity = 1;
    this.taxes = 0;
    this.loyer = 0;
  }

  preload ()
  {
    this.level.money.create();
  }

  create ()
  {
    this.level.chat.open('bienvenue1');
    console.log("ENGINE loaded!");

    this.add.image(100, this.level.height - 190, 'cursor');
    this.add.image(55, this.level.height - 235, 'zoomOut').setScale(0.7).setInteractive().on('pointerdown', () => {
      this.resetDirection();
      this.zoomOut = 1;
    }).on('pointerup', () => {
      this.zoomOut = 0;
    });
    this.add.image(145, this.level.height - 235, 'zoomIn').setScale(0.7).setInteractive().on('pointerdown', () => {
      this.resetDirection();
      this.zoomIn = 1;
    }).on('pointerup', () => {
      this.zoomIn = 0;
    });

    var left = this.add.image(60,this.level.height-190).setScale(1.3,1.2).setInteractive().on('pointerdown', () => {
      this.resetDirection();
      this.moveX = -1;
    }).on('pointerup', () => {
      this.moveX = 0;
    });

    var right = this.add.image(140,this.level.height-190).setScale(1.3,1.2).setInteractive().on('pointerdown', () => {
      this.resetDirection();
      this.moveX = 1;
    }).on('pointerup', () => {
      this.moveX = 0;
    });

    var up = this.add.image(100,this.level.height-230).setScale(1.3,1.2).setInteractive().on('pointerdown', () => {
      this.resetDirection();
      this.moveY = -1;
    }).on('pointerup', () => {
      this.moveY = 0;
    });

    var down = this.add.image(100,this.level.height-150).setScale(1.3,1.2).setInteractive().on('pointerdown', () => {
      this.resetDirection();
      this.moveY = 1;
    }).on('pointerup', () => {
      this.moveY = 0;
    });
  }

  resetDirection(){
    this.zoomOut = 0;
    this.zoomIn = 0;
    this.moveX = 0;
    this.moveY = 0;
  }

  update (time, delta)
  {
    this.level.money.update(time);
    this.level.time.update(time);
    this.level.event.update(time);

    this.level.cameraMovement.move(this.moveX,this.moveY,this.zoomIn,this.zoomOut);
  }
}
