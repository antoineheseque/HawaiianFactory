class Chat{
  constructor(level){
    this.level = level;
    this.typeSpeed = 0.5;
  }

  preload(){
    // Get level file
    loadJSON('../chat.json', function(response, mI) {
      mI.chat = JSON.parse(response);
    }, this);
  }

  open(key){
    var container = this.add.container(0, 300);

    var msg = this.chat[key];
    var chat = this.make.text({
      x: this.width,
      y: 50,
      text: msg,
      style: {
        font: '16px monospace',
        fill: '#ffffff',
        wordWrap: { width: 240 }
      }
    });

    this.container.add(chat);
  }
}
