class Event{
  constructor(level){
    this.level = level;
    this.preload();
  }

  preload(){
    this.rand();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  erruption(){
    this.level.chat.open("volcan");
    console.log("Volcan");
  }

  rand(){
    if(1 == this.getRandomInt(30)) // Une chance sur 30+1 de réliser l'event
      this.erruption();
  }

}
