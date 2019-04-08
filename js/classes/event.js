class Event{
  constructor(game, level){
    this.level = level;
    this.game = game;
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

  prime1(){
    if(this.level.day == 1 && this.level.month == 5){
      this.level.chat.open("prime1");
      this.game.productivity *= 1.2;
    }
    if(this.level.day == 1 && this.level.month == 6){
      this.level.chat.destroy();
      this.game.productivity /= 1.2;
    }
  }


  update(time){
    if(time - this.level.actuel > 500){
      //console.log(this.level.day);
      this.rand();
      this.prime1();
    }
  }



  rand(){
    if(this.level.chat.key == ''){
      if(1 == this.getRandomInt(20)){ // Une chance sur X+1 de réaliser l'event
       // Si aucun texte est en train d'être joué alors on joue l'événement
        this.erruption();
      }
      this.prime1();
      if(1 == this.getRandomInt(2)){ // Une chance sur X+1 de réaliser l'event
       // Si aucun texte est en train d'être joué alors on joue l'événement
       this.prime1();
      }
    }
  }
}
