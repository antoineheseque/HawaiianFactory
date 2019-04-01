class Chat{
  constructor(level){
    this.level = level;
    this.preload();
  }

  preload(){
    // Get chat file
    loadJSON('../chat.json', function(response, mI) {
      mI.chat = JSON.parse(response);
    }, this);

    console.log('open chat');

    // Cheat code
    var keyCombo = this.level.input.keyboard.createCombo(['T','X','T'], {
      resetOnWrongKey: true,
      // maxKeyDelay: 0,
      resetOnMatch: true,
      // deleteOnMatch: false,
    });
    //this.open('prime1');
    this.level.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) { this.open('prime1'); }, this);
  }

  open(key){
    if(this.container != null)
      this.container.destroy();

    if(!this.chat[key]){
      console.error("Aucune clé" + key + " existe");
      return;
    }

    this.container = this.level.UI.add.container(300, 500);
    var fontChat = this.level.UI.add.graphics();
    fontChat.fillStyle(0x222222, 1);
    fontChat.fillRect(0, 0, this.level.width-500, 200);
    var destroyBox = this.level.UI.add.image(470, 0, 'blank');

    // Permet de garder l'ancienne clé et de continuer l'événement sans couper les 'next'
    if(key != 'touche')
      this.key = key;

    var girl = this.level.UI.add.image(0, 25, 'girl' + this.chat[key].texture).setScale(0.4);
    var msg = this.chat[key].text;
    var message = this.level.UI.make.text({
      x: 130,
      y: 20,
      text: msg,
      style: {
        font: '30px monospace',
        fill: '#ffffff',
        wordWrap: { width: this.level.width-500 - 145}
      }
    });

    // Desactive temporairement car fout la merde quand on a plusieur textes d"information a la suite
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
    this.container.add(girl);
    this.container.add(message);
    this.container.add(destroyBox);

  }
}
