class LoadLevel extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'loadLevel' });
    this.selectedObject = -1;
    this.selectedType = 'none';

    this.showTutorial = false;
  }

  preload ()
  {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create ()
  {
    var background = this.add.image(0,0,'background').setOrigin(0,0).setDisplaySize(this.width, this.height);
    var logo = this.add.image(this.width/2, this.height/2-100, 'logo').setDisplaySize(450, 100);

    this.inputText = new InputText(this);
    var level = this;
    this.inputText.getText("Entrez votre nom d'Usine", "Envoyer", function(username){
      // SERVER PART
      level.socket = io.connect('', {query: 'name=' + username}); // Crée le socket du joueur

      //var player = prompt("Entrez le nom de votre Usine :", "Unknown");

      // Load JSON file into a dictionnary
      loadJSON('../objects.json', function(response, phaser) {
        var assets = JSON.parse(response);

        // Load machines objects
        Object.values(assets['machines']).forEach(function(element){ // Parcourir toute les images
          element.upgrades.forEach(function(element2){ // Parcourir toute les upgrades
            if(element2.frames > 1){ // Quand il n'y a qu'une frame pour l'upgrade
              var frames = phaser.getFrames(element2.texture, element2.frames);
              var frameRate = 2*element2.frames;
              if(element2.speed)
                frameRate *= element2.speed;
              var config = {
                  key: element2.texture,
                  frames: frames,
                  frameRate: frameRate,
                  repeat: -1
              };
              phaser.anims.create(config);
            }
          }, this);
        }, level);

        // Load cursor
        phaser.anims.create({
            key: 'gray',
            frames: [
              { key: 'gray-1' },
              { key: 'gray-2' },
              { key: 'gray-3' }
            ],
            frameRate: 3,
            repeat: -1
        });
        phaser.anims.create({
            key: 'red',
            frames: [
              { key: 'red-1' },
              { key: 'red-2' },
              { key: 'red-3' }
            ],
            frameRate: 3,
            repeat: -1
        });

        // Load environment objects
        Object.values(assets['environment']).forEach(function(element){ // Parcourir toute les images
          element.upgrades.forEach(function(element2){ // Parcourir toute les upgrades
            if(element2.frames > 1){ // Quand il n'y a qu'une frame pour l'upgrade
              var frames = phaser.getFrames(element2.texture, element2.frames);
              var frameRate = 2*element2.frames;
              if(element2.speed)
                frameRate *= element2.speed;
              phaser.anims.create({
                  key: element2.texture,
                  frames: frames,
                  frameRate: frameRate,
                  repeat: -1
              });
            }
          }, element);
        }, level);
      }, level);

      level.mouseInteraction = new MouseInteraction(level);
      level.mouseInteraction.preload();
      level.cameraMovement = new CameraMovement(level);

      level.scene.launch('gameUI', level);
      level.scene.launch('gameEngine', level);

      level.loadLevel(0);

      level.miniCam = level.cameras.add(10, 50, 200, 133);
      level.miniCam.setBounds(0, 0, level.maxWidth*32, level.maxHeight*32);
      level.miniCam.setZoom(0.078);

      console.log("Map loaded!");
    });
  }

  loadLevel(worldIndex){
    this.worldIndex = worldIndex;
    // Get level file
    loadJSON('../levels/levels.json', function(response, phaser) {
      phaser.worlds = JSON.parse(response);
      // Get level JSON file

      loadJSON('../levels/' + phaser.worlds[worldIndex].name + '/level_01.json', function(resp, phas) {
        phas.levelJSON = JSON.parse(resp);
      }, phaser);
    }, this);

    if(this.game.money){ // Si ce n'est pas le premier level
      this.level.removeLevel();
      this.game.money.money /= 1.25;
      this.game.money.addMoneyAmount = 0;
      this.game.productivity = 1;
      this.game.taxes = 0;
      this.game.loyer = 0;
    }
    this.level = new Map(this.levelJSON, this);
    this.game.loyer = this.worlds[this.worldIndex].rent;
  }

  update (time, delta)
  {
    //this.mouseInteraction.update();
    if(this.cameraMovement)
      this.cameraMovement.update(delta);
  }

  getFrames(text, nbr)
  {
    var frames = [];
    for(var i = 1; i <= nbr; i++){
      frames.push({ 'key':text+'-'+i });
    }
    return frames;
  }
}
