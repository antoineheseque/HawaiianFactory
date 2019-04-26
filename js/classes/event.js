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
      }
    }
  }

  addToList(event, date){
    var newEvent = new Array(event, date);
  }

  /////////////// TOUT LES EVENEMENTS INCERTAINS
  rand(day, month, year){
    if(this.game.chat.key == ''){
      if(1 == this.getRandomInt(1000)) // Une chance sur X+1 de réaliser l'event
        var date = new Date(year, month, day + 5);
        this.game.chat.open("volcan");
        addToList("erruption", date);
      if(1 == this.getRandomInt(2)){
        if(day == 1 && month == 12){
          var date = new Date(year, month, day + 30);
          this.game.chat.open("prime1");
          this.game.chat.open_small("prime1", true);
          this.game.productivity *= 1.2;
          addToList("prime1", date);
        }
      } // Une chance sur X+1 de réaliser l'event

  }


  /////////////// TOUT LES EVENEMENTS CERTAINS

  /*prime1(day, month){
    if(day == 1 && month == 12){
      if(this.game.chat.key == '') // Si rien n'est ouvert (tuto ou event special) on affiche qqch
        this.game.chat.open("prime1");
      this.game.chat.open_small("prime1", true);

      this.prime1_played = true;
      this.game.productivity *= 1.2;
    }
    if(day == 1 && month == 2){
      if(this.prime1_played == true){ // Assure une sécurité si jamais le joueur démarre pendant la période de l'event,
                       // Sinon il se serait tapé une productivité divisée par 1.2 alors qu'il était à 1
        if(this.game.chat.key == '') // Si rien n'est ouvert (tuto ou event special) on affiche qqch
          this.game.chat.open("prime1_end");
        this.game.chat.open_small("prime1_end", true);

        this.prime1_played = false;
        this.game.productivity /= 1.2;
      }
    }
  }*/
  /////////////////////////////

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
