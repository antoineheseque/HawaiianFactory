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
        acceleration: 0.05,
        drag: 0.0003,
        maxSpeed: 0.8
    };
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    // Zoom system
    this.zoomIn = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.zoomOut = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.zoom = 1;
  }

  update(delta){
    this.controls.update(delta);
    if(this.zoomIn.isDown && this.zoom < 1.8)
      this.zoom += 0.01;
    if(this.zoomOut.isDown && this.zoom > 0.4)
      this.zoom -= 0.01;
    this.level.cameras.main.setZoom(this.zoom);
  }
}
