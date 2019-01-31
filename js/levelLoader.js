class LoadLevel extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'loadLevel' });
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
    this.level = new Level(this.levelJSON, this);
    this.level.loadLevel();

    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    };
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    console.log("Map loaded!");
  }

  update (time, delta)
  {
    this.controls.update(delta);
  }
}
