class LoadLevel extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'loadLevel' });
    this.selectedObject = -1;
  }

  preload ()
  {
    // Get level file
    loadJSON('../levels/levels.json', function(response, phaser) {
      var levels = JSON.parse(response);
      // Get level JSON file
      loadJSON('../levels/' + levels.start.world + '/' + levels.start.level + '.json', function(resp, phas) {
        phas.levelJSON = JSON.parse(resp);
      }, phaser);
    }, this);
  }

  create ()
  {
    this.anims.create({
        key: 'activated',
        frames: [
            { key: 'machine1-1' },
            { key: 'machine1-2' }
        ],
        frameRate: 4,
        repeat: -1
    });

    this.level = new Map(this.levelJSON, this);
    this.mouseInteraction = new MouseInteraction(this);
    this.cameraMovement = new CameraMovement(this);

    this.UI = this.scene.launch('gameUI', this);
    this.game = this.scene.launch('gameEngine', this);
    console.log("Map loaded!");
  }

  update (time, delta)
  {
    this.mouseInteraction.update();
    this.cameraMovement.update(delta);
  }
}
