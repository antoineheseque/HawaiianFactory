class Event{
  constructor(game){
    this.game = game;
    this.listEvent = new Array();
  }

  update(day, month, year){
    // Jouer les événements incertains (fonction rand)
    if(this.game.chat.key == '') // Vérifier qu'aucun tuto est ouvert est en train d'être joué
      this.rand(day, month, year);

    // Jouer les événements certains
    this.prime1(day, month);

    for(var i = 0; i < this.listEvent.lenght; i++){
      if(this.listEvent[i][1].getDate() == day && this.listEvent[i][1].getMonth() == month && this.listEvent[i][1].getFullYear() == year){
        if(this.listEvent[i][0] == "erruption")
          this.game.level.cameras.main.shake(1000, 0.02); // Effet pour eruption volcanique
        if(this.listEvent[i][0] == "prime1"){
          this.game.chat.open("prime1_end");
          this.game.chat.open_small("prime1_end", true);
          this.game.productivity /= 1.2;
        }
        if(this.listEvent[i][0] == "concert1"){
          this.game.productivity /= 3;
        }
        if(this.listEvent[i][0] == "concert2"){
          this.game.productivity /= 3;
        }
        if(this.listEvent[i][0] == "taxe1"){
          this.game.productivity *= 1.2;
        }
        if(this.listEvent[i][0] == "taxe2"){
          this.game.productivity *= 1.1;
        }
      }
    }
  }

  addToList(event, date){
    var newEvent = new Array(event, date);
  }

  /////////////// TOUT LES EVENEMENTS INCERTAINS
  rand(day, month, year){
    if(this.game.chat.key == ''){
      if(1 == this.getRandomInt(3000)){ // Une chance sur X+1 de réaliser l'event
        var date = new Date(year, month, day + 5);
        this.game.chat.open("volcan");
        addToList("erruption", date);
      }
      if(1 == this.getRandomInt(5000)){ // Une chance sur X+1 de réaliser l'event
        var date = new Date(year, month, day + 30);
        this.game.chat.open("concert1");
        this.game.productivity *= 3;
        addToList("concert1", date);
      }
      if(1 == this.getRandomInt(5000)){ // Une chance sur X+1 de réaliser l'event
        var date = new Date(year, month, day + 30);
        this.game.chat.open("concert2");
        this.game.productivity *= 3;
        addToList("concert2", date);
      }
      if(1 == this.getRandomInt(1000)){ // Une chance sur X+1 de réaliser l'event
        var date = new Date(year, month, day + 20);
        this.game.chat.open("taxe1");
        this.game.productivity /= 1.2;
        addToList("taxe1", date);
      }
      if(1 == this.getRandomInt(1000)){ // Une chance sur X+1 de réaliser l'event
        var date = new Date(year, month, day + 20);
        this.game.chat.open("taxe1");
        this.game.productivity /= 1.1;
        addToList("taxe2", date);
      }
      if(1 == this.getRandomInt(2)){ // Une chance sur X+1 de réaliser l'event
        if(day == 1 && month == 12){
          var date = new Date(year, month, day + 30);
          this.game.chat.open("prime1");
          this.game.chat.open_small("prime1", true);
          this.game.productivity *= 1.2;
          addToList("prime1", date);
        }
      }

  }
}

  ///////////////////////////

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
