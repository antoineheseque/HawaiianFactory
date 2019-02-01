class Level {

  constructor(levelJSON, phaser){
    // Une couche pour le niveau,
    // Une couche pour les objets (machines, éoliennes, ...)
    this.background = [];
    this.tiles = [];
    this.phaser = phaser;
    this.levelJSON = levelJSON;
  }

  loadLevel(){
    //AFFICHER LE BACKGROUND
    var maxWidth = this.levelJSON.layers[0].width;
    var maxHeight = this.levelJSON.layers[0].height;

    this.phaser.cameras.main.setBounds(0, 0, maxWidth*32, maxHeight*32);
    //this.phaser.cameras.main.setViewport(0, 0, maxWidth*32, maxHeight*32);
    //this.cameras.main.centerOn(0, 0);
    this.phaser.cameras.main.setZoom(0.7);
    for(var y = 0; y < maxHeight; y++){
      for(var x = 0; x < maxWidth; x++){
        // Add dimention array when starting new line
        if(x == 0)
          this.background[y] = [];
        // Set tile in the 2-dimentional array
        this.background[y][x] = new Tile(this.levelJSON.layers[0].data[y*maxWidth+x]-1, x, y, this);
      }
    }
  }
}
