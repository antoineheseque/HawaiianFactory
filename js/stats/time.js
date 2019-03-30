class Time{
  constructor(game){
    this.game = game;
    this.date = new Date();

    this.width = game.cameras.main.width;
    this.height = game.cameras.main.height;
    this.time = 0
    this.preload();
  }

  preload(){
    var mBackground = this.game.add.graphics();
    mBackground.fillStyle(0x222222, 0.8);
    mBackground.fillRect(this.width / 2 - 100, 10, 200, 40);
    this.timeText = this.game.make.text({
      x: this.width / 2,
      y: 30,
      text: 'unknown',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    this.timeText.setOrigin(0.5, 0.5);
  }

  // this.phaser.cameras.main.shake(1000, 0.02);
  // Effet pour eruption volcanique


  update(time){
    if(time - this.time > 150){
      this.date.setDate(this.date.getDate()+1);
      this.timeText.text = this.formatDate(this.date);
      this.money += this.addMoneyAmount;
      this.time = time;
    }
  }

  formatDate(date) {
    var monthNames = [
      "Janvier", "Février", "Mars",
      "Avril", "Mai", "Juin", "Juillet",
      "Août", "Septembre", "Octobre",
      "Novembre", "Décembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}
