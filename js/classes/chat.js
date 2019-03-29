class Chat{
  constructor(level){
    this.level = level;
    this.typeSpeed = 0.5;
    this.preload();
  }

  preload(){
    // Get level file
    loadJSON('../chat.json', function(response, mI) {
      mI.chat = JSON.parse(response);
    }, this);

    // Cheat code qui donne 1 000 000 €
    var keyCombo = this.level.input.keyboard.createCombo(['T','X','T'], {
      resetOnWrongKey: true,
      // maxKeyDelay: 0,
      resetOnMatch: true,
      // deleteOnMatch: false,
    });
    this.level.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) { console.log('played'); this.open('volcan'); }, this);
  }

  open(key){
    this.container = this.level.add.container(0, 300);

    var msg = this.chat[key];
    var chat = this.level.make.text({
      x: this.level.width,
      y: this.level.height / 2,
      text: msg,
      style: {
        font: '34px monospace',
        fill: '#ffffff',
        wordWrap: { width: 600 }
      }
    });

    this.container.add(chat);
  }
}
