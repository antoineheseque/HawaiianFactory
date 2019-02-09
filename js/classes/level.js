class Level {

  constructor(levelJSON, phaser){
    // Une couche pour le niveau,
    // Une couche pour les objets (machines, éoliennes, ...)
    this.background = [];
    this.objects = [];
    this.phaser = phaser;
    this.levelJSON = levelJSON;
    this.loadLevel();
  }

  loadLevel(){
    //AFFICHER LE BACKGROUND
    this.maxWidth = this.levelJSON.layers[0].width;
    this.maxHeight = this.levelJSON.layers[0].height;

    this.phaser.cameras.main.setBounds(0, 0, this.maxWidth*32, this.maxHeight*32);
    //this.phaser.cameras.main.setViewport(0, 0, maxWidth*32, maxHeight*32);
    //this.cameras.main.centerOn(0, 0);
    for(var y = 0; y < this.maxHeight; y++){
      for(var x = 0; x < this.maxWidth; x++){
        // Add dimention array when starting new line
        if(x == 0){
          this.background[y] = [];
          this.objects[y] = [];
        }
        // Set tile in the 2-dimentional array
        this.background[y][x] = new Tile('ground', this.levelJSON.layers[0].data[y*this.maxWidth+x]-1, x, y, this);
      }
    }
    //this.objects[4][8] = new Machine('machine1-1', 8*32, 4*32, this);
  }

  addMachine(x,y,name){
    // Bien sur un sol et aucun objet deja present
    if(this.objects[y][x] == null && this.background[y][x].name == 13)
      this.objects[y][x] = new Machine('machine', name, x*32, y*32, this);
  }
}
