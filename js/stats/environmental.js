class EnvironmentalStat{
  constructor(startVal, game){
    this.game = game;
    this.stat = new Stats(260, game.level.height-100+10, 'Environnemental', startVal, 0, 1000, 0x0FDD43, this);
  }

  onMin(){

  }

  onMax(){

  }
}
