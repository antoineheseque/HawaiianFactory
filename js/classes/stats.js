class Stats{
  constructor(x,y,name,start,min,max,color,instance){
    this.name = name;
    this.value = start;
    this.min = min;
    this.max = max;
    this.color = color;
    this.x = x;
    this.y = y;
    this.instance = instance;
    this.height = this.instance.game.level.height;

    // Progress bar ///////////////
    this.progressBar = instance.game.add.graphics();
    var progressBox = instance.game.add.graphics();
    progressBox.fillStyle(color, 0.2);
    progressBox.fillRect(x, y, 200/(800/this.height), 30);

    this.progressBar.fillStyle(color, 1);
    var value = Phaser.Math.Percent(start, min, max);
    this.progressBar.fillRect(x+5, y+5, 190/(800/this.height) * value, 20);

    /* Fonctionnel, plus qu'à remplir
    var trigger = instance.game.add.image(x+100,y+15).setScale(6.8,1.1).setOrigin(0.5,0.5).setInteractive().on('pointerover', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
      this.previewStats = this.open(x,y);
    }).on('pointerout', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
    }).on('pointerdown', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
      this.previewStats = this.open(x,y);
    }).on('pointerup', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
    });*/

    // Stat Name ///////////////
    var percentText = instance.game.make.text({
      x: x+100/(800/this.height),
      y: y+15,
      text: name,
      style: {
        font: '16px monospace',
        fill: '#000'
      }
    });
    percentText.setOrigin(0.5, 0.5);
  }

  changeRange(min,max){
    this.min = min;
    this.max = max;
    var percent = Phaser.Math.Percent(this.value, this.min, this.max);
    this.progressBar.clear();
    this.progressBar.fillStyle(this.color, 1);
    this.progressBar.fillRect(this.x+5, this.y+5, 190/(800/this.height) * percent, 20);
  }

  update(val){

    if(this.value+val < this.min){
      this.instance.onMin();
    }
    if(this.value+val > this.max){
      this.instance.onMax();
    }

    if(this.name != 'Technologique'){ // Si normal
      this.value = this.value + val; //Phaser.Math.Clamp(this.value + val, this.min, this.max);
    } else { // Si technologique cumuler et remettre à 0
      if(this.value + val > this.max){
        this.value = (this.value + val) - Math.abs(this.max) - Math.abs(this.min);
        this.instance.played = '';
      }
      else if (this.value + val < this.min){
        this.value = (this.value + val) + Math.abs(this.max) + Math.abs(this.min);
        this.instance.played = '';
      }
      else{
        this.value += val;
      }
    }
    var percent = Phaser.Math.Percent(this.value, this.min, this.max);
    this.progressBar.clear();
    this.progressBar.fillStyle(this.color, 1);
    this.progressBar.fillRect(this.x+5, this.y+5, 190/(800/this.height) * percent, 20);
  }

  /*open(x,y){
    var container = this.instance.game.add.container(x, y-80);

    // Add Background
    var background = this.instance.game.add.graphics();
    background.fillStyle(0x222222, 0.7);
    background.fillRect(0, 0, 200, 80);
    container.add(background);

    return container;
  }*/
}
