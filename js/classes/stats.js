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
    var progressBox = instance.game.add.graphics();
    progressBox.fillStyle(color, 0.2);
    progressBox.fillRect(x, y, 200/(800/this.height), 30);

    this.progressBar = instance.game.add.graphics();
    this.progressBar.fillStyle(color, 1);
    this.show();

    //Fonctionnel, plus qu'à remplir
    var trigger = instance.game.add.image(x+100/(800/this.height),y+15/(800/this.height)).setScale(6.8/(800/this.height),1.1/(800/this.height)).setOrigin(0.5,0.5).setInteractive().on('pointerover', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
      this.previewStats = this.open(x,y);
    }).on('pointerout', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
          this.previewStats = null;
    }).on('pointerdown', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
      this.previewStats = this.open(x,y);
    }).on('pointerup', () => {
      if(this.previewStats != null)
          this.previewStats.destroy();
          this.previewStats = null;
    });

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

    // Tech only
    this.techLevel = 0;
  }

  changeRange(min,max){
    this.min = min;
    this.max = max;
  }

  update(val){

    if(this.value+val <= this.min){
      this.instance.onMin();
    }
    if(this.value+val >= this.max){
      this.instance.onMax();
    }

    if(this.name != 'Technologique'){ // Si normal
      this.value += val; //Phaser.Math.Clamp(this.value + val, this.min, this.max);
    } else { // Si technologique cumuler et remettre à 0
      if(this.value + val > this.max){
        this.techLevel += 1;
        this.instance.game.productivity *= 1+0.1 * this.techLevel;
        this.value = (this.value + val) - Math.abs(this.max) - Math.abs(this.min);
        this.instance.played = '';
      }
      else if (this.value + val < this.min){
        this.techLevel -= 1;
        this.instance.game.productivity /= 1+0.1 * this.techLevel;
        this.value = (this.value + val) + Math.abs(this.max) + Math.abs(this.min);
        this.instance.played = '';
      }
      else{
        this.value += val;
      }
    }
    this.show();
  }

  show(){
    var percent = Phaser.Math.Percent(this.value, this.min, this.max);
    this.progressBar.clear();
    this.progressBar.fillStyle(this.color, 1);
    this.progressBar.fillRect(this.x+5, this.y+5, 190/(800/this.height) * percent, 20);

    if(this.previewStats != null){
      this.previewStats.destroy();
      this.previewStats = this.open(this.x,this.y);
    }
  }

  updateFixed(val){
    this.value = val;
    this.show();
  }

  open(x,y){
    var container = this.instance.game.add.container(x, y-80);

    // Add Background
    var background = this.instance.game.add.graphics();
    background.fillStyle(0x222222, 0.7);
    background.fillRect(0, 0, 200/(800/this.height), 80);
    container.add(background);

    var percent = Phaser.Math.Percent(this.value, this.min, this.max);
    var pos = percent*100;

    if(this.name != 'Technologique'){
      var statText = this.instance.game.make.text({
        x: 200/(800/this.height)/2,
        y: 40,
        text: this.name + ': ' + pos.toFixed(2) + '%',
        style: {
          font: '18px monospace',
          fill: '#ffffff',
          align: 'center'
        }
      }).setOrigin(0.5,0.5);
      container.add(statText);
    }
    else{
      var statText = this.instance.game.make.text({
        x: 200/(800/this.height)/2,
        y: 20,
        text: this.name + ': ' + pos.toFixed(2) + '%',
        style: {
          font: '18px monospace',
          fill: '#ffffff',
          align: 'center'
        }
      }).setOrigin(0.5,0.5);
      container.add(statText);
      var bonusText = this.instance.game.make.text({
        x: 200/(800/this.height)/2,
        y: 60,
        text: 'Bonus: Productivité +' + (1+0.1*this.techLevel),
        style: {
          font: '18px monospace',
          fill: '#ffffff',
          align: 'center'
        }
      }).setOrigin(0.5,0.5);
      container.add(statText);
      container.add(bonusText);
    }

    return container;
  }
}
