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
    this.level.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) { console.log('played'); this.open('prime1'); }, this);
  }

  open(key){
    this.container = this.level.UI.add.container(0, 300);

    var fontChat = this.level.UI.add.graphics();
    fontChat.fillStyle(0x222222, 1);
    fontChat.fillRect(250, 200, this.level.width-500, 200);
    var girl = this.level.UI.add.image(250, 224, 'girl7').setScale(0.4);
    var msg = this.chat[key].text;
    var chat = this.level.UI.make.text({
      x: 390,
      y: 224,
      text: msg,
      style: {
        font: '30px monospace',
        fill: '#ffffff',
        wordWrap: { width: this.level.width-500 - 270}
      }
    });
    this.container.add(fontChat);
    this.container.add(girl);
    this.container.add(chat);
  }
}
