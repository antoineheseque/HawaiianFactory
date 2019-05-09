class MoneyStat{
  constructor(startMoney, game){
    this.money = startMoney;
    this.moneyShown = 0;
    this.addMoneyAmount = 0;
    this.game = game;
    this.time = 0;
    this.preload();
    this.stat = new Stats(40/(800/game.level.height), game.level.height-100+10, 'Economique', startMoney, 0, 0,0xFF8C00, this);
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
        text: 'Vous n\'avez malheureusement pas sû gérer correctement votre argent, faites plus attention la prochaine fois!',
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

  preload(){
    var mBackground = this.game.add.graphics();
    mBackground.fillStyle(0x222222, 0.8);
    mBackground.fillRect(10, 10, 200, 40);
    this.moneyText = this.game.make.text({
      x: 195,
      y: 30,
      text: '0 $',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
        align: 'right'
      }
    });
    this.moneyText.setOrigin(1, 0.5);

    // Cheat code qui donne 1 000 000 €
    var keyCombo = this.game.input.keyboard.createCombo(['M','O','N','Y'], {
      resetOnWrongKey: true,
      resetOnMatch: true,
    });
    this.game.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) {
      this.money += 1000000;
      this.game.productivity = 1000;
      this.game.time.speed = 10;
      if(!this.game.scale.isFullscreen){
        this.game.scale.startFullscreen();
      }
    }, this);
  }

  create(){
    this.game.add.image(35, 30, 'gold');
  }

  update(time){
    // Si moneyshown est loin de la monnaie réelle
    if(time - this.time > 10 && Math.abs(this.moneyShown - this.money) > 0.005){
      this.moneyShown = Phaser.Math.Linear(this.moneyShown, this.money, 0.25);
      this.moneyText.text = this.moneyShown.toFixed(2) + '$';
      this.time = time;
    }
  }

  newDay(day, month){
    this.money += this.addMoneyAmount*this.game.productivity;
    this.stat.changeRange(0, this.addMoneyAmount*30*7*this.game.productivity); // 6 mois

    if(day == 1)
      this.money -= this.game.loyer;

    this.stat.update(this.addMoneyAmount*this.game.productivity);
  }

  addMoneyEachDay(amount){
    this.addMoneyAmount += amount;
  }

  removeMoneyEachDay(amount){
    this.addMoneyAmount -= amount;
  }

  checkPriceSelected(cost){
    if(this.money >= cost){
      return true;
    }
    return false;
  }

  buy(cost){
    if(this.money >= cost){
      this.money -= cost;
      this.stat.updateFixed(0);
      return true;
    }
    return false;
  }

  sell(cost){
    this.money += cost;
    this.stat.update(cost);
  }
}
