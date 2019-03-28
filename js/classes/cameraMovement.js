class CameraMovement{
  constructor(level){
    // Camera movement system
    this.level = level;
    var leftKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    var rightKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    var upKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    var downKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    var controlConfig = {
        camera: level.cameras.main,
        left: leftKey,
        right: rightKey,
        up: upKey,
        down: downKey,
        acceleration: 0.04,
        drag: 0.0004,
        maxSpeed: 0.6
    };
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    // Zoom system
    this.zoomIn = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.zoomOut = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.zoom = 1;
  }

  update(delta){
    this.controls.update(delta);
    if(this.zoomIn.isDown && this.zoom < 1.7)
      this.zoom += 0.015;
    if(this.zoomOut.isDown && this.zoom > 0.5)
      this.zoom -= 0.015;
    this.level.cameras.main.setZoom(this.zoom);
  }
}
