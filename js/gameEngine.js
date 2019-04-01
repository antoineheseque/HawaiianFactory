class GameEngine extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameEngine' });
  }

  init(level){
    this.level = level;
    this.level.game = this;

    this.level.money = new MoneyStat(1000, this);
    this.level.time = new Time(this);
    this.level.chat = new Chat(this.level);
    this.level.event = new Event(this.level);

    this.productivity = 1;
    this.taxes = 1;
  }

  preload ()
  {
    this.level.money.create();
  }

  create ()
  {
    this.level.chat.open('bienvenue1');
    console.log("ENGINE loaded!");
  }

  update (time, delta)
  {
    this.level.money.update(time);
    this.level.time.update(time);
    this.level.event.update(time);
  }
}
