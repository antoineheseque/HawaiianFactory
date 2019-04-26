class Event{
  constructor(game){
    this.game = game;
    this.listEvent = new Array();
  }

  update(day, month, year){
    // Jouer les événements incertains (fonction rand)
    if(this.game.chat.key == '') // Vérifier qu'aucun tuto est ouvert est en train d'être joué
      this.rand(day, month, year);

    for(var i = 0; i < this.listEvent.length; i++){
      var date = this.listEvent[i][1];
      if(date.getDate() == day && date.getMonth() == month && date.getFullYear() == year){
        if(this.listEvent[i][0] == "eruption")
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
        this.listEvent.splice(i,1);
        i--;
      }
    }
  }

  addToList(event, date){
    var newEvent = new Array(event, date);
    this.listEvent.push(newEvent);
  }

  /////////////// TOUT LES EVENEMENTS INCERTAINS
  rand(day, month, year){
    if(this.game.chat.key == ''){
      var date = new Date(year, month, day);
      if(1 == this.getRandomInt(3000)){ // Une chance sur X+1 de réaliser l'event
        date.setDate(date.getDate()+15);
        this.game.chat.open("volcan");
        this.addToList("eruption", date);
      }
      else if(1 == this.getRandomInt(5000)){ // Une chance sur X+1 de réaliser l'event
        date.setDate(date.getDate()+30);
        this.game.chat.open("concert1");
        this.game.productivity *= 3;
        this.addToList("concert1", date);
      }
      else if(1 == this.getRandomInt(5000)){ // Une chance sur X+1 de réaliser l'event
        date.setDate(date.getDate()+30);
        this.game.chat.open("concert2");
        this.game.productivity *= 3;
        this.addToList("concert2", date);
      }
      else if(1 == this.getRandomInt(1000)){ // Une chance sur X+1 de réaliser l'event
        date.setDate(date.getDate()+20);
        this.game.chat.open("taxe1");
        this.game.productivity /= 1.2;
        this.addToList("taxe1", date);
      }
      else if(1 == this.getRandomInt(1000)){ // Une chance sur X+1 de réaliser l'event
        date.setDate(date.getDate()+20);
        this.game.chat.open("taxe1");
        this.game.productivity /= 1.1;
        this.addToList("taxe2", date);
      }
      else if(1 == this.getRandomInt(2)){ // Une chance sur X+1 de réaliser l'event
        if(day == 1 && month == 12){
          date.setDate(date.getDate()+30);
          this.game.chat.open("prime1");
          this.game.chat.open_small("prime1", true);
          this.game.productivity *= 1.2;
          this.addToList("prime1", date);
        }
      }
  }
}

  ///////////////////////////

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
