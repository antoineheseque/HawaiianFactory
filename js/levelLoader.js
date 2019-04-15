class LoadLevel extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'loadLevel' });
    this.selectedObject = -1;
    this.selectedType = 'none';
  }

  preload ()
  {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    var player = prompt("Entrez le nom de votre Usine :", "Unknown");
    this.username = player;

    // SERVER PART
    console.log(this.username);
    this.socket = io.connect('', {query: 'name=' + this.username}); // Crée le socket du joueur 
  }

  create ()
  {
    // Load JSON file into a dictionnary
    loadJSON('../objects.json', function(response, phaser) {
      var assets = JSON.parse(response);

      // Load machines objects
      Object.values(assets['machines']).forEach(function(element){ // Parcourir toute les images
        element.upgrades.forEach(function(element2){ // Parcourir toute les upgrades
          if(element2.frames > 1){ // Quand il n'y a qu'une frame pour l'upgrade
            var frames = phaser.getFrames(element2.texture, element2.frames);

            var config = {
                key: element2.texture,
                frames: frames,
                frameRate: 2*element2.frames,
                repeat: -1
            };
            phaser.anims.create(config);
          }
        }, this);
      }, this);

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
            phaser.anims.create({
                key: element2.texture,
                frames: frames,
                frameRate: 2*element2.frames,
                repeat: -1
            });
          }
        }, element);
      }, this);
    }, this);

    this.mouseInteraction = new MouseInteraction(this);
    this.mouseInteraction.preload();
    this.cameraMovement = new CameraMovement(this);

    this.scene.launch('gameUI', this);
    this.scene.launch('gameEngine', this);

    this.loadLevel(0);

    this.miniCam = this.cameras.add(10, 50, 200, 133);
    this.miniCam.setBounds(0, 0, this.maxWidth*32, this.maxHeight*32);
    this.miniCam.setZoom(0.078);

    console.log("Map loaded!");
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

    if(this.money){ // Si ce n'est pas le premier level
      this.level.removeLevel();
      this.money.money /= 1.25;
      this.money.addMoneyAmount = 0;
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
