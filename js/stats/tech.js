class TechnologicalStat{
  constructor(startVal, game){
    this.game = game;
    this.stat = new Stats(260, game.level.height-100+45, 'Technologique', startVal, 0, 1000, 0x0F73DD, this);
  }

  onMin(){
    if(this.played != 'min'){
      this.played = 'min';

    }
  }

  onMax(){
    if(this.played != 'max'){
      this.played = 'max';

      console.log('Niveau atteint !');
    }
  }
}
