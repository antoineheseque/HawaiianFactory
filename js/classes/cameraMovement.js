class CameraMovement{
  constructor(level){
    // Camera movement system
    this.level = level;
    var leftKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    var rightKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    var upKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    var downKey = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

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

    this.cam = this.level.cameras.main;

    this.zoomMin = 1.7 / (760 / this.cam.height);
    this.zoomMax = 0.5 / (760 / this.cam.height);

    // Zoom system
    this.zoomIn = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
    this.zoomOut = level.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    this.zoom = 1;
  }

  move(x, y, zoomIn, zoomOut){
    if(x != 0 && x != null){
      this.cam.setScroll(this.cam.scrollX + 15*x, this.cam.scrollY);
    }
    if(y != 0 && y != null){
      this.cam.setScroll(this.cam.scrollX, this.cam.scrollY + 15*y);
    }

    if(zoomIn > 0){
      if(this.zoom < this.zoomMin)
        this.zoom += 0.015;
        this.cam.setZoom(this.zoom);
    }
    if(zoomOut > 0){
      if(this.zoom > this.zoomMax)
        this.zoom -= 0.015;
        this.cam.setZoom(this.zoom);
    }
  }

  update(delta){
    this.controls.update(delta);
    if(this.zoomIn.isDown && this.zoom < this.zoomMin)
      this.zoom += 0.015;
    if(this.zoomOut.isDown && this.zoom > this.zoomMax)
      this.zoom -= 0.015;
    this.cam.setZoom(this.zoom);
  }
}
