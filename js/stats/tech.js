class TechnologicalStat{
  constructor(startVal, game){
    this.game = game;
    this.stat = new Stats(260, game.level.height-100+45, 'Technologique', startVal, 0, 2500, 0x0F73DD, this);
  }

  onMin(){
    if(this.played != 'min'){
      this.played = 'min';
      this.stat.changeRange(this.stat.min, this.stat.max/=1.35);
    }
  }

  onMax(){
    if(this.played != 'max'){
      this.played = 'max';

      this.stat.changeRange(this.stat.min, this.stat.max*=1.35);
      console.log('Niveau atteint !');
    }
  }
}
