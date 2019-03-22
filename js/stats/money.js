class MoneyStat{
  constructor(startMoney, game){
    this.money = startMoney;
    this.addMoneyAmount = 0;
    this.game = game;
    this.time = 0;
    this.preload();
  }

  preload(){
    var mBackground = this.game.add.graphics();
    mBackground.fillStyle(0x222222, 0.8);
    mBackground.fillRect(10, 10, 100, 40);
    this.moneyText = this.game.make.text({
      x: 60,
      y: 30,
      text: '0 $',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    this.moneyText.setOrigin(0.5, 0.5);

    // Cheat code qui donne 1 000 000 €
    var keyCombo = this.game.input.keyboard.createCombo(['M','O','N','Y'], {
      resetOnWrongKey: true,
      // maxKeyDelay: 0,
      resetOnMatch: true,
      // deleteOnMatch: false,
    });
    this.game.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) { this.money += 1000000; }, this);
  }

  update(time){
    if(time - this.time > 50){
      this.money += (this.addMoneyAmount/3);
      // time.js executé tt les 150, ici tout les 50 pour avoir un beau visuel donc /3 sinon on gagne 3x plus d'argent
      this.moneyText.text = Phaser.Math.RoundTo(this.money) + ' €';
      this.time = time;
    }
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
      return true;
    }
    return false;
  }

  sell(cost){
    this.money += cost;
  }
}
