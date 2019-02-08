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

    // Camera movement system
    var leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    var rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    var upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    var downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    var controlConfig = {
        camera: this.cameras.main,
        left: leftKey,
        right: rightKey,
        up: upKey,
        down: downKey,
        acceleration: 0.05,
        drag: 0.0003,
        maxSpeed: 0.8
    };
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    // Zoom system
    this.zoomIn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.zoomOut = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.zoom = 1;
    console.log("Map loaded!");

    this.scene.launch('gameUI');
    this.scene.launch('gameEngine');
  }

  update (time, delta)
  {
    this.controls.update(delta);
    if(this.zoomIn.isDown && this.zoom < 1.8)
      this.zoom += 0.01;
    if(this.zoomOut.isDown && this.zoom > 0.4)
      this.zoom -= 0.01;
    this.cameras.main.setZoom(this.zoom);
  }
}
