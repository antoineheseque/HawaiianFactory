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
    this.level.cameras.main.shake(1000, 0.02); // Effet pour eruption volcanique
  }

  update(time){
    if(time > 150){
      this.rand();
    }
  }

  rand(){
    if(this.level.chat.key == ''){
      if(1 == this.getRandomInt(300000)){ // Une chance sur X+1 de réaliser l'event
       // Si aucun texte est en train d'être joué alors on joue l'événement
        this.erruption();
      }
    }
  }
}
