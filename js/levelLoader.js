class LoadLevel extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'loadLevel' });
  }

  preload ()
  {
    loadJSON('../levels/levels.json', function(response) {
      var levels = JSON.parse(response);
      console.log(levels);
    });
  }

  create ()
  {
    console.log("Map loaded!");
  }
}
