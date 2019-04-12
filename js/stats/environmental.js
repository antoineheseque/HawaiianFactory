class EnvironmentalStat{
  constructor(startVal, game){
    this.game = game;
    this.stat = new Stats(260, game.level.height-100+10, 'Environnemental', startVal, -5000, 5000, 0x0FDD43, this);
  }

  onMin(){
    if(this.played != 'min'){
      this.played = 'min';

      var mBackground = this.game.add.graphics();
      mBackground.fillStyle(0x222222, 0.7);
      mBackground.fillRect(0, 0, this.game.level.width, this.game.level.height);

      this.game.add.image(200,this.game.level.height-220,'girl4').setScale(0.5,0.5);

      var text = this.game.make.text({
        x: this.game.level.width / 2,
        y: this.game.level.height / 2 - 100,
        text: 'Vous n\'êtes pas pour l\'environnement vous! Vous auriez dû y préter plus attention, c\'est une usine du futur, pas une usine à gaz!',
        style: {
          font: '40px monospace',
          fill: '#ffffff',
          wordWrap: { width: this.game.level.width / 1.5 }
        }
      });
      text.setOrigin(0.5,0.5);

      var replay = this.game.add.text(this.game.level.width / 2, this.game.level.height/2 + 100, 'Rejouer', { fill: '#0f0' }).setFontSize(50).setFontStyle('bold').setInteractive().setOrigin(0.5, 0.5).on('pointerdown', () => {
        location.reload();
      });
    }
  }

  onMax(){
    if(this.played != 'max'){
      this.played = 'max';

    }
  }
}
