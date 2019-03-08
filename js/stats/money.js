class MoneyStat{
  constructor(startMoney, game){
    this.money = startMoney;
    this.addMoneyAmount = 10;
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
  }

  update(time){
    if(time - this.time > 50){
      this.money += this.addMoneyAmount;
      this.moneyText.text = this.money + ' €';
      this.time = time;
    }
  }

  checkPriceSelected(cost){
    if(this.money > cost){
      this.money -= cost;
      console.log('A PAYE');
      return true;
    }
    return false;
  }
}
