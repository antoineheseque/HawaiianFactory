class SocialStat{
  constructor(startVal, game){
    this.game =  game;
    this.stat = new Stats(40/(800/game.level.height), game.level.height-100+45, 'Social', startVal, -1000, 1000, 0xE5FF50, this);
  }

  onMin(){
    if(this.played != 'min'){
      this.played = 'min';

    }
  }

  onMax(){
    if(this.played != 'max'){
      this.played = 'max';

    }
  }
}
