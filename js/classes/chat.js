class Chat{
  constructor(game){
    this.game = game;
    this.preload();
    this.width = this.game.level.width;
    this.height = this.game.level.height;
    this.UI = this.game.level.UI;
    this.key == '';

    this.messages = [];
    this.list = [];

    this.fondChat = this.UI.add.graphics();
  }

  preload(){
    this.counter = 0;

    // Get chat file
    loadJSON('../chat.json', function(response, mI) {
      mI.chat = JSON.parse(response);
    }, this);

    // Cheat code
    var keyCombo = this.game.input.keyboard.createCombo(['T','X','T'], {
      resetOnWrongKey: true,
      resetOnMatch: true,
    });
    this.game.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) { this.open_small('Ceci est le message n' + this.counter); this.counter++; }, this);
  }

  open(key){
    if(this.container != null)
      this.container.destroy();

    if(!this.chat[key]){
      console.error("Aucune clé" + key + " existe");
      return;
    }

    this.container = this.UI.add.container(300, 500);
    var fontChat = this.UI.add.graphics();
    fontChat.fillStyle(0x222222, 1);
    fontChat.fillRect(0, 0, this.width-500, 200);
    var destroyBox = this.UI.add.image(350, 100, 'blank');

    // Permet de garder l'ancienne clé et de continuer l'événement sans couper les 'next'
    if(key != 'touche')
      this.key = key;

    var girl = this.UI.add.image(0, 25, 'girl' + this.chat[key].texture).setScale(0.4);
    var msg = this.chat[key].text;
    if(key == 'changeUsine'){
      var message = this.UI.make.text({
        x: 130,
        y: 20,
        text: msg,
        style: {
          font: '25px monospace',
          fill: '#ffffff',
          wordWrap: { width: this.width-500 - 145}
        }
      });
    }
    else {
      var message = this.UI.make.text({
        x: 130,
        y: 20,
        text: msg,
        style: {
          font: '30px monospace',
          fill: '#ffffff',
          wordWrap: { width: this.width-500 - 145}
        }
      });
    }

    girl.setInteractive().on('pointerdown', () =>
    {
      this.open('touche');
    });
    destroyBox.setInteractive().on('pointerdown', () =>
    {
      this.container.destroy();

      if(this.chat[this.key].next)
        this.open(this.chat[this.key].next);
      else
        this.key = '';
    });

    this.container.add(fontChat);
    this.container.add(message);
    this.container.add(destroyBox);
    this.container.add(girl);
  }

  open_small(message){
    open_small(message, false);
  }

  // SMALL LIST
  open_small(message, key){
    // msg == message si string, sinon c'est qu'on envoi une clé du chat.json donc on récup le message
    var msg = (key == true) ? this.chat[message].text : message;
    if(this.messages.length >= 5){
      this.messages.shift();
      var obj = this.list.shift();
      if(obj != null){
        this.linesCount -= obj.lineCount;
        obj.message.destroy();
      }
    }
    var date = '[' + (this.game.day < 10 ? '0' + this.game.day : this.game.day) + '/' + (this.game.month < 10 ? '0' + this.game.month : this.game.month) + '/' + this.game.year + '] ';
    this.messages.push(date + msg);

    if(this.game.level.selectedObject >= -1)
      this.show_small();
  }

  show_small(){
    this.hide_small();
    if(this.messages.length > 0){
      this.linesCount = 1;

      for(var i = 0; i < this.messages.length; i++){
        var text = this.game.make.text({
          x: 0,
          y: 0,
          text: this.messages[i],
          style: {
            font: '12px monospace',
            fill: '#ffffff',
            wordWrap: { width:290 }
          }
        });

        var msg = text.basicWordWrap(text.text, text.context, 290);
        var lines = msg.split(/\r\n|\r|\n/).length;

        text.setPosition(this.width-300, 10+(this.linesCount-1)*13);
        this.linesCount += lines;

        var obj = {
          lines:lines,
          message:text
        }

        this.list.push(obj);
      }
      this.fondChat.clear();
      this.fondChat.fillStyle(0x222222, 0.7);
      this.fondChat.fillRect(this.width - 305, 5, 295, 13*this.linesCount);
    }
  }

  hide_small(){
    this.fondChat.clear();
    if(this.list.length > 0){
      for(var i = this.list.length; i > 0; i--){
        this.list.shift().message.destroy();
      }
    }

  }

  destroy(){
    this.container.destroy();
  }
}
